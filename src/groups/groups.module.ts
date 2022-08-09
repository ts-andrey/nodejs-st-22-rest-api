import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { Group } from './entities/group.entity';
import { SequelizeGroupsRepository } from './../data-access/sequelize-groups.repository';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService, SequelizeGroupsRepository],
})
export class GroupsModule {}
