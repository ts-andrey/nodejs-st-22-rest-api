import { v4 as uuidv4 } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  createUser(login: string, password: string, age: number) {
    const user = new User(uuidv4(), login, password, age, false);
    this.users.push(user);
    return user;
  }

  getAllUsers() {
    return this.users.filter((el) => !el.isDeleted);
  }

  getUser(id: string) {
    const [user] = this.findUser(id);
    if (!user.isDeleted) {
      return { ...user };
    }
    throw new NotFoundException('Could not find user');
  }

  updateUser(id: string, login: string, password: string, age: number) {
    const [user, userIndex] = this.findUser(id);
    const updatedUser = { ...user };
    if (login) {
      updatedUser.login = login;
    }
    if (password) {
      updatedUser.password = password;
    }
    if (age) {
      updatedUser.age = age;
    }
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  removeUser(id: string) {
    const [user, userIndex] = this.findUser(id);
    const removedUser = { ...user };
    removedUser.isDeleted = true;
    this.users[userIndex] = removedUser;
    return removedUser;
  }

  private findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return [user, userIndex];
  }
}
