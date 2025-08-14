import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<{ id: string } | null> {
    const userId = await this.authService.validate({ email, password });

    if (!userId) throw new UnauthorizedException();
    return userId;
  }
}
