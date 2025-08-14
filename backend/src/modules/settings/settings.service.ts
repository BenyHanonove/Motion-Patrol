import { HttpStatus, Injectable } from '@nestjs/common';

// Express Response type for manual response handling
import { Response } from 'express';

// Import entities
import { SettingsEntity } from '@db/entities/settings.entity';

// Import interfaces
import { ISettingRequest } from '@interfaces/Settings.model';

@Injectable()
export class SettingService {
  // Retrieve settings for a specific user by their ownerId
  public async get(
    ownerId: string,
    response: Response,
  ): Promise<SettingsEntity | null> {
    try {
      // Find settings in the database for the given ownerId
      const setting: SettingsEntity | null = await SettingsEntity.findOne({
        where: { ownerId: ownerId },
      });

      // Return the settings if found
      if (setting) return setting;
      // If settings not found, respond with 404 Not Found
      else {
        response
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Couldn't find settings" });
        return null;
      }
    } catch (error) {
      console.log(error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error getting setting'" });
      return null;
    }
  }

  // Update a settings record and return the updated entity
  public async update(
    settingDetails: ISettingRequest & { id: string },
    res: Response,
  ): Promise<SettingsEntity | null> {
    try {
      // Update settings and return affected rows with updated records
      const [affectedCount, updatedRows] = await SettingsEntity.update(
        { ...settingDetails },
        {
          where: { id: settingDetails.id },
          returning: true,
        },
      );

      // If settings were updated, return the first updated record
      if (affectedCount > 0 && updatedRows.length > 0) return updatedRows[0];
      // If no settings were updated, respond with 404 Not Found
      else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Could not find settings' });
        return null;
      }
    } catch (error) {
      // Log the error and return a 500 Internal Server Error response
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error updating settings' });
      console.error(error);
      return null;
    }
  }

  //
  public async delete(
    settingDetails: ISettingRequest & { id: string },
    res: Response,
  ): Promise<SettingsEntity | null> {
    try {
      // Update settings and return affected rows with updated records
      const [affectedCount, updatedRows] = await SettingsEntity.update(
        { ...settingDetails },
        {
          where: { id: settingDetails.id },
          returning: true,
        },
      );

      // If settings were updated, return the first updated record
      if (affectedCount > 0 && updatedRows.length > 0) return updatedRows[0];
      // If no settings were updated, respond with 404 Not Found
      else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Could not find settings' });
        return null;
      }
    } catch (error) {
      // Log the error and return a 500 Internal Server Error response
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error updating settings' });
      console.error(error);
      return null;
    }
  }
}
