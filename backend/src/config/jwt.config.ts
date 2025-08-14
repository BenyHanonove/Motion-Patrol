import { ConfigModule, ConfigService } from '@nestjs/config';
import { EEnvironmentEnums } from '@enum/environment.enum';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

const jwtFactory: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>(EEnvironmentEnums.JWT_SECRET),
    signOptions: {
      expiresIn: configService.get<string>(EEnvironmentEnums.JWT_EXP_H),
    },
  }),
  inject: [ConfigService],
};

export default jwtFactory;
