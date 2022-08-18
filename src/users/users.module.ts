import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeUsersRepository } from './../data-access/sequelize-users.repository';
import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.postgres.model';
import { UserGroup } from './../models/UserGroup.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserGroup])],
  controllers: [UsersController],
  providers: [UsersService, SequelizeUsersRepository],
})
export class UsersModule {}
