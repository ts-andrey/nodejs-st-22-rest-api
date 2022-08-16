import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { GroupsController } from './controllers/groups.controller';
import { Group } from './entities/group.entity';
import { UserGroup } from '../models/UserGroup.model';
import { SequelizeGroupsRepository } from './../data-access/sequelize-groups.repository';
import { UserGroupService } from './services/user-group.service';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [SequelizeModule.forFeature([Group, UserGroup])],
  controllers: [GroupsController],
  providers: [GroupsService, SequelizeGroupsRepository, UserGroupService],
})
export class GroupsModule {}
