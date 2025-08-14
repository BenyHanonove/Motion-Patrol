import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

// Import Express types for handling HTTP requests and responses
import { Response, Request } from 'express';

// Import interfaces
import {
  IRegisterRequest,
  ILoginResponse,
  ILoginRequest,
} from '@interfaces/Auth.model';

// Import services
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { EStrategies } from '@enum/EStrategies.enum';
import { AuthEntity } from '@db/entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registers a new user and returns a token upon successful registration.
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() body: IRegisterRequest, @Res() res: Response) {
    const token: ILoginResponse | null = await this.authService.register(
      body,
      res,
    );

    if (token) {
      return res.status(HttpStatus.CREATED).send(token);
    }
  }

  // Handle POST request for user login and return a JWT token if authentication is successful
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  public async login(@Body() body: ILoginRequest, @Res() res: Response) {
    const token: ILoginResponse | null = await this.authService.login(
      body,
      res,
    );

    if (token) {
      return res.status(HttpStatus.ACCEPTED).send(token);
    }
  }

  // Retrieve the authenticated user's details, excluding the password
  @UseGuards(AuthGuard(EStrategies.JWT))
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async get(@Req() req: Request, @Res() res: Response) {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (token) {
      const user: AuthEntity | null = await this.authService.get(token, res);

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...data } = user.get({ plain: true });
        res
          .status(HttpStatus.OK)
          .json({ message: 'User found', data: { user: data } });
      }
    }

    res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  // Delete the authenticated user's account using the provided JWT token
  @UseGuards(AuthGuard(EStrategies.JWT))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete')
  public async delete(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const destroyed: boolean = await this.authService.delete(token, res);
      console.log(destroyed);
      if (destroyed) res.status(HttpStatus.NO_CONTENT);
    }
  }
}
