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
import type { IPermissionModel } from '@interfaces/Permission.model';

@Table({ tableName: 'permission', timestamps: true, underscored: true })
export class PermissionEntity
  extends Model<IPermissionModel>
  implements IPermissionModel
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  declare ownerId: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare motionOn: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  declare cameraOrder: string[];
}
