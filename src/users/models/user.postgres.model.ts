import { Group } from './../../groups/entities/group.entity';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

interface UserCreationAttributes {
  login: string;
  password: string;
  age: number;
}

@Table({ timestamps: false })
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @HasMany(() => Group)
  groups: Group[];
}
