import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Group } from './../groups/entities/group.entity';
import { User } from 'src/users/models/user.postgres.model';

@Table
export class UserGroup extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;
}
