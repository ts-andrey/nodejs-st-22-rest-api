import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { GetUsersFilterDTO } from 'src/users/dto/get-users-filter.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { AsyncUsersRepository } from 'src/users/interfaces/pg.users.repository';
import { User } from 'src/users/models/user.postgres.model';
import { PostgressService } from 'src/services/pg.sequelize.service';

@Injectable()
export class SequelizeUsersRepository implements AsyncUsersRepository<User> {
  constructor(private readonly pgService: PostgressService) {
    pgService.connect();
  }

  async findAll(filterDTO: GetUsersFilterDTO) {
    let users: User[];
    const searchStr = filterDTO.loginSubstring;
    if (filterDTO.isAll) {
      users = await User.findAll();
    } else {
      users = await User.findAll({
        where: {
          login: {
            [Op.iLike]: `%${searchStr === undefined ? '' : searchStr}%`,
          },
          isDeleted: false,
        },
      });
    }
    return filterDTO.limit === undefined
      ? users
      : users.slice(0, Number(filterDTO.limit));
  }

  async findById(id: string) {
    const user = await User.findOne({
      where: { id: Number(id), isDeleted: false },
    });
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async create(createDTO: CreateUserDTO) {
    const user = await User.findOne({
      where: {
        login: createDTO.login,
      },
    });
    if (user) {
      throw new BadRequestException({
        statusCode: 409,
        error: 'Conflict',
        message: 'such login already exists',
      });
    }
    return await User.create(createDTO);
  }

  async update(id: string, updateDTO: UpdateUserDTO) {
    const user = await this.findById(id);
    const existedUser = await this.findByLogin(updateDTO.login);
    if (existedUser) {
      throw new BadRequestException({
        statusCode: 409,
        error: 'Conflict',
        message: 'such login already exists',
      });
    }
    return await user.update(updateDTO);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    return await user.update({ isDeleted: true });
  }

  private async findByLogin(login: string) {
    return await User.findOne({ where: { login, isDeleted: false } });
  }
}
