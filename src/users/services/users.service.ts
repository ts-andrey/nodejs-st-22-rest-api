import { Injectable } from '@nestjs/common';

import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

import { SequelizeUsersRepository } from './../../data-access/sequelize-users.repository';
import { User } from '../models/user.postgres.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: SequelizeUsersRepository) {}

  createUser(createUserDTO: CreateUserDTO) {
    return this.usersRepository.create(createUserDTO);
  }

  getAll(getUsersFilterDTO: GetUsersFilterDTO) {
    let users: Promise<User[]>;
    if (getUsersFilterDTO.isAll) {
      users = this.usersRepository.findAll();
    } else if (Object.keys(getUsersFilterDTO).length > 0) {
      users = this.usersRepository.findFiltered(getUsersFilterDTO);
    } else {
      users = this.usersRepository.findActual();
    }
    return users;
  }

  getUser(id: string) {
    return this.usersRepository.findById(id);
  }

  updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    return this.usersRepository.update(id, updateUserDTO);
  }

  removeUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
