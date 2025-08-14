import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

// Import AuthEntity for defining foreign key relationships
import { AuthEntity } from './auth.entity';

// Import interface for type safety in the entity
import type { IAlertModel } from '@interfaces/Alert.model';

@Table({ tableName: 'alert', timestamps: true, underscored: true })
export class AlertEntity extends Model<IAlertModel> implements IAlertModel {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare cameraId: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare timestamp: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isWatched: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isMotion: boolean;

  @Column({ type: DataType.JSONB, allowNull: false })
  declare time: {
    start: { hour: number; mins: number };
    end: { hour: number; mins: number };
  };

  @CreatedAt
  @Column({ defaultValue: DataType.NOW })
  declare createdAt: Date;
}
