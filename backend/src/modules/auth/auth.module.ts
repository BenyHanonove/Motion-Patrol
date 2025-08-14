import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtFactory from '@config/jwt.config';

// Import Auth strategies
import { LocalStrategy } from './utils/strategies/local.strategy';
import { JwtStrategy } from './utils/strategies/jwt.strategy';

// import controller and service
import { AuthController } from './auth.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory)],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
