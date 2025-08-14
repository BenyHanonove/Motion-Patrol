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
import type { ICaptureModel } from '@interfaces/Capture.model';

@Table({ tableName: 'capture', timestamps: true, underscored: true })
export class CaptureEntity
  extends Model<ICaptureModel>
  implements ICaptureModel
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column({ type: DataType.UUID, allowNull: false })
  declare cameraId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare imageUrl: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare timestamp: Date;
}
