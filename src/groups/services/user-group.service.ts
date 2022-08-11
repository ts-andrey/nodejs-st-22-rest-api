import { Group } from './../entities/group.entity';
import { User } from 'src/users/models/user.postgres.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

@Injectable()
export class UserGroupService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Group) private readonly groupModel: typeof Group,
  ) {}

  async addUsersToGroup(groupID: string, usersIDs: string[]) {
    const t = await this.sequelize.transaction();

    try {
      const group = await this.groupModel.findByPk(groupID, { transaction: t });
      const users = await this.userModel.findAll({
        where: { id: usersIDs },
        transaction: t,
      });
      group.$add('users', users);
      users.map((user) => user.$add('groups', group));
      t.commit();
    } catch (error) {
      t.rollback();
    }
  }
}
