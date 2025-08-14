import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Configure Passport JWT strategy and token extraction
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Import environment enums
import { EEnvironmentEnums } from '@enum/environment.enum';

// Import express
import { Request } from 'express';

// Import entity
import { AuthEntity } from '@db/entities/auth.entity';

// Import consts
import { AUTH_HEADER, TOKEN_EXPIRATION_TIME } from '../const';

interface JwtPayload {
  sub: string;
  email: string;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>(EEnvironmentEnums.JWT_SECRET);
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => JwtStrategy.extractJWTFromCookie(req),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    return req?.headers?.[AUTH_HEADER] as string | null;
  }

  public async validate(payload: JwtPayload): Promise<AuthEntity | null> {
    const now = Math.floor(Date.now() / 1000);
    const maxExp = now + TOKEN_EXPIRATION_TIME;

    // Custom expiration guard
    if (payload.exp > maxExp) {
      return null;
    }

    return await AuthEntity.findOne({ where: { id: payload.sub } });
  }
}
