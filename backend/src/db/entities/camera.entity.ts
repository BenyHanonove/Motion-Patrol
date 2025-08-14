import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  ForeignKey,
} from 'sequelize-typescript';

// Import AuthEntity for defining foreign key relationships
import { AuthEntity } from './auth.entity';

// Import interface for type safety in the entity
import type { ICameraModel } from '@interfaces/Camera.model';

@Table({ tableName: 'camera', timestamps: true, underscored: true })
export class CameraEntity extends Model<ICameraModel> implements ICameraModel {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare streamUrl: string;

  @CreatedAt
  @Column({ defaultValue: DataType.NOW })
  declare createdAt: Date;
}
