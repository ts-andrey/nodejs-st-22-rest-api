import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeUsersRepository } from './../data-access/sequelize-users.repository';
import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.postgres.model';
import { UserGroup } from './../models/UserGroup.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserGroup]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, SequelizeUsersRepository],
})
export class UsersModule {}
