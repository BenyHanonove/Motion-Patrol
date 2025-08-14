import { HttpStatus, Injectable } from '@nestjs/common';

// JWT service for generating and verifying tokens
import { JwtService } from '@nestjs/jwt';

// Express Response type for manual response handling
import { Response } from 'express';

// Library for hashing and comparing passwords
import * as bcrypt from 'bcrypt';

// Import entities
import { AlertEntity } from '@db/entities/alert.entity';
import { AuthEntity } from '@db/entities/auth.entity';
import { CaptureEntity } from '@db/entities/capture.entity';
import { PermissionEntity } from '@db/entities/permission.entity';
import { SettingsEntity } from '@db/entities/settings.entity';

// Import interfaces
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from '@interfaces/Auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Validate user credentials and return their ID if authentication succeeds
  public async validate(
    loginDetails: ILoginRequest,
  ): Promise<{ id: string } | null> {
    const user = await AuthEntity.findOne({
      where: { email: loginDetails.email },
    });
    if (!user) return null;

    const doesPasswordMatch: boolean = bcrypt.compareSync(
      loginDetails.password,
      user.password,
    );
    if (!doesPasswordMatch) return null;

    const { id } = user;
    return { id };
  }

  // Register a new user, store hashed password, generate a JWT token, and return it
  public async register(
    registerDetails: IRegisterRequest,
    res: Response,
  ): Promise<ILoginResponse | null> {
    try {
      // Check if a user with the same email already exists
      const isDuplicated = await AuthEntity.findOne({
        where: { email: registerDetails.email },
      });

      if (isDuplicated) {
        res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Email already taken' });
        return null;
      }

      // Hash the user's password and create a new user record in the database
      const hashedPassword: string = bcrypt.hashSync(
        registerDetails.password,
        10,
      );

      const newUser = await AuthEntity.create({
        email: registerDetails.email,
        password: hashedPassword,
      });

      // Handle failure to create a new user in the database
      if (!newUser) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error when creating account',
        });
        return null;
      }

      // Generate a JWT token for the new user, save it to the database, and return it
      const token = this.jwtService.sign(
        { sub: newUser.id },
        { expiresIn: 3600 },
      );
      await newUser.update({ token });
      return { token };
    } catch (error) {
      // Log the error, send a 500 Internal Server Error response, and return null
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error when creating new user',
      });
      console.error(error);
      return null;
    }
  }

  // Authenticate a user and return a JWT token if credentials are valid
  public async login(
    loginDetails: ILoginRequest,
    res: Response,
  ): Promise<ILoginResponse | null> {
    try {
      // Check if a user with the same email already exists
      const user: AuthEntity | null = await AuthEntity.findOne({
        where: { email: loginDetails.email },
      });

      // If the user is not found, return a 409 Conflict indicating invalid credentials
      if (!user) {
        res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Invalid email or password' });
        return null;
      }

      // Compare the provided password with the stored hashed password
      const doesPasswordMatch: boolean = bcrypt.compareSync(
        loginDetails.password,
        user.password,
      );

      // If the password matches, generate a JWT token, update the user record, and return the token
      if (doesPasswordMatch) {
        const token = this.jwtService.sign(
          { sub: user.id },
          { expiresIn: 3600 },
        );
        // Update user token and return it
        await user.update({
          token: token,
        });
        return { token };
        // Respond with 409 Conflict if the provided email incorrect
      } else {
        res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Invalid email or password' });
        return null;
      }
    } catch (error) {
      // Log the error, send a 500 Internal Server Error response, and return null
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error when login',
      });
      console.log(error);
      return null;
    }
  }

  // Retrieve a user entity from the database using their JWT token
  public async get(token: string, res: Response): Promise<AuthEntity | null> {
    try {
      // Look up the user in the database using the provided token
      const user = await AuthEntity.findOne({
        where: { token },
      });

      // Return the user if found
      if (user) return user;
      // If no user is found, return a 404 Not Found response
      else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Couldn`t find user' });
        return null;
      }
    } catch (error) {
      // Log the error and return a 500 Internal Server Error response
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '' });
      console.log(error);
      return null;
    }
  }

  // Delete a user and all related records based on their JWT token
  public async delete(token: string, res: Response): Promise<boolean> {
    try {
      // Find the user in the database by their JWT token
      const user: AuthEntity | null = await AuthEntity.findOne({
        where: { token },
      });

      // Return 404 if no user is found for the given token
      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Cant find user' });
        return false;
      }

      // Delete related rows in other tables
      await SettingsEntity.destroy({ where: { ownerId: user.id } });
      await PermissionEntity.destroy({ where: { ownerId: user.id } });
      await CaptureEntity.destroy({ where: { ownerId: user.id } });
      await AlertEntity.destroy({ where: { ownerId: user.id } });

      // Finally delete the user
      await user.destroy();
      return true;
    } catch (error) {
      // Log the error and return a 500 Internal Server Error response
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error deleting account' });
      console.error(error);
      return false;
    }
  }
}
