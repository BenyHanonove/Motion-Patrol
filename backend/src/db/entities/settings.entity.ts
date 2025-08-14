import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// Import AuthEntity for defining foreign key relationships
import { AuthEntity } from './auth.entity';

// Import interface for type safety in the entity
import type { ISettingsModel } from '@interfaces/Settings.model';

@Table({ tableName: 'settings', timestamps: true, underscored: true })
export class SettingsEntity
  extends Model<ISettingsModel>
  implements ISettingsModel
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column({ type: DataType.ENUM('english', 'hebrew'), allowNull: false })
  declare language: 'english' | 'hebrew';

  @Column({ type: DataType.ENUM('light', 'dark', 'system'), allowNull: false })
  declare theme: 'light' | 'dark' | 'system';

  @Column({ type: DataType.ENUM('Low', 'Medium', 'High'), allowNull: false })
  declare motionLevel: 'Low' | 'Medium' | 'High';
}
