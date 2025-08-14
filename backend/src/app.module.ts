import { Module } from '@nestjs/common';

// Import Sequelize configuration and module
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from '@config/db.config';

// Import modules
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
