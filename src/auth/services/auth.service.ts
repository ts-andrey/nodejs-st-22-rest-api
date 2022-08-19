import { Injectable } from '@nestjs/common';
import Jwt from 'jsonwebtoken';

import { LoginDTO } from '../dto/login.dto';

import { SequelizeUsersRepository } from './../../data-access/sequelize-users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: SequelizeUsersRepository) {}
  async getUserToken(loginDto: LoginDTO) {
    const user = await this.usersRepository.findByLogin(loginDto);
    const token = user
      ? Jwt.sign({ user }, 'secret_key', { expiresIn: '1h' })
      : null;
    return token;
  }
}
