import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { GetUsersFilterDTO } from './../users/dto/get-users-filter.dto';
import { UpdateUserDTO } from './../users/dto/update-user.dto';
import { CreateUserDTO } from './../users/dto/create-user.dto';
import { UsersRepository } from 'src/users/interfaces/users.repository';
import { User } from 'src/users/models/user.model';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  findById(id: string) {
    this.checkId(id);
    const [user] = this.findUser(id);
    if (!user.isDeleted) {
      return { ...user };
    }
    throw new NotFoundException('Could not find user');
  }

  findAll(filterDTO: GetUsersFilterDTO) {
    if (filterDTO.loginSubstring && filterDTO.limit) {
      const str = filterDTO.loginSubstring.replace(/"/g, '');
      return this.users
        .filter((el) => el.login.startsWith(str) && !el.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, filterDTO.limit);
    } else {
      return this.users.filter((el) => !el.isDeleted);
    }
  }

  create(createDTO: CreateUserDTO) {
    const { login, password, age, isDeleted } = createDTO;
    if (this.users.find((el) => el.login === login)) {
      throw new BadRequestException({
        statusCode: 409,
        error: 'Conflict',
        message: 'such login already exists',
      });
    }
    const user = new User(uuidv4(), login, password, age, isDeleted || false);
    this.users.push(user);
    return user;
  }

  update(id: string, updateDTO: UpdateUserDTO) {
    this.checkId(id);
    const [_, userIndex] = this.findUser(id);
    const updatedUser = { id, ...updateDTO };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    this.checkId(id);
    const [user, userIndex] = this.findUser(id);
    const removedUser = { ...user };
    removedUser.isDeleted = true;
    this.users[userIndex] = removedUser;
    return removedUser;
  }

  private findUser(id: string): [User, number] {
    this.checkId(id);
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return [user, userIndex];
  }

  private checkId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Not valid id',
      });
    }
  }
}
