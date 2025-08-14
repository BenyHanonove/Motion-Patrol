import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { SettingService } from './settings.service';

// Import Express types for handling HTTP requests and responses
import { Response } from 'express';

// Import interfaces
import { ISettingRequest } from '@interfaces/Settings.model';

// Import services
import { EStrategies } from '@enum/EStrategies.enum';
import { SettingsEntity } from '@db/entities/settings.entity';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @UseGuards(AuthGuard(EStrategies.JWT))
  @HttpCode(HttpStatus.OK)
  @Put('')
  public async put(@Body() body: ISettingRequest, @Res() res: Response) {
    const settings: SettingsEntity | null = await this.settingService.update(
      body,
      res,
    );

    if (settings) {
      res.status(HttpStatus.OK).json({
        message: 'Update setting success',
        data: settings,
      });
    }
  }
}
