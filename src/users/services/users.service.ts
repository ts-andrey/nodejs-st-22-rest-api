import { Injectable } from '@nestjs/common';
import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { InMemoryUsersRepository } from 'src/data-access/in-memory-users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: InMemoryUsersRepository) {}

  createUser(createUserDTO: CreateUserDTO) {
    return this.usersRepository.create(createUserDTO);
  }

  getAllUsers(filter: GetUsersFilterDTO) {
    return this.usersRepository.findAll(filter);
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
