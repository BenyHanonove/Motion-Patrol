import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

// Import interface for type safety in the entity
import type { IAuthModel } from '@interfaces/Auth.model';

@Table({
  tableName: 'auth',
  timestamps: true,
  underscored: true,
  comment: 'Authentication table',
})
export class AuthEntity extends Model<IAuthModel> implements IAuthModel {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare token: string | null;

  @CreatedAt
  @Column({ defaultValue: DataType.NOW })
  declare createdAt: Date;
}
