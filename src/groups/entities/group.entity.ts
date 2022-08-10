import { UserGroup } from './../../models/UserGroup.model';
import { User } from 'src/users/models/user.postgres.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
}

interface GroupCreationAttributes {
  name: string;
  permissions: Permission[];
}

@Table({ timestamps: false })
export class Group extends Model<GroupAttributes, GroupCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
