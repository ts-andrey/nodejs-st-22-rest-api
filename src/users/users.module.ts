import { SequelizeUsersRepository } from './../data-access/sequelize-users.repository';
import { InMemoryUsersRepository } from 'src/data-access/in-memory-users.repository';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PostgressService } from '../services/pg.sequelize.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PostgressService,
    InMemoryUsersRepository,
    SequelizeUsersRepository,
  ],
})
export class UsersModule {}
