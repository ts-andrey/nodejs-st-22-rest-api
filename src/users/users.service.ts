import { v4 as uuidv4, validate } from 'uuid';

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.model';
import { GetUsersFilterDTO } from './dto/get-users-filter.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(createUserDTO: CreateUserDTO) {
    const { login, password, age, isDeleted } = createUserDTO;
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

  getAllUsers(filter: GetUsersFilterDTO) {
    if (filter.loginSubstring && filter.limit) {
      const str = filter.loginSubstring.replace(/"/g, '');
      return this.users
        .filter((el) => el.login.startsWith(str) && !el.isDeleted)
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, filter.limit);
    } else {
      return this.users.filter((el) => !el.isDeleted);
    }
  }

  getUser(id: string) {
    const [user] = this.findUser(id);
    if (!user.isDeleted) {
      return { ...user };
    }
    throw new NotFoundException('Could not find user');
  }

  updateUser(id, updateUserDTO: UpdateUserDTO) {
    const [user, userIndex] = this.findUser(id);

    this.users[userIndex] = updateUserDTO;
    return updateUserDTO;
  }

  removeUser(id: string) {
    const [user, userIndex] = this.findUser(id);
    const removedUser = { ...user };
    removedUser.isDeleted = true;
    this.users[userIndex] = removedUser;
    return removedUser;
  }

  getAllData() {
    return [...this.users];
  }

  private findUser(id: string): [User, number] {
    if (validate(id)) {
      const userIndex = this.users.findIndex((user) => user.id === id);
      const user = this.users[userIndex];
      if (!user) {
        throw new NotFoundException('Could not find user');
      }
      return [user, userIndex];
    }
    throw new BadRequestException({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Not valid id',
    });
  }
}
