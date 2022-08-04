import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { GetUsersFilterDTO } from 'src/users/dto/get-users-filter.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/models/user.postgres.model';

@Injectable()
export class SequelizeUsersRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll() {
    return await this.userModel.findAll();
  }

  async findActual() {
    return await this.userModel.findAll({
      where: {
        isDeleted: false,
      },
    });
  }

  async findFiltered(filterDto: GetUsersFilterDTO) {
    const { loginSubstring, limit } = filterDto;

    return await this.userModel.findAll({
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring === undefined ? '' : loginSubstring}%`,
        },
        isDeleted: false,
      },
      limit: Number(limit),
    });
  }

  async findById(id: string) {
    return await this.userModel.findOne({
      where: { id, isDeleted: false },
    });
  }

  async create(createDTO: CreateUserDTO) {
    return await this.userModel.create(createDTO);
  }

  async update(id: string, updateDTO: UpdateUserDTO) {
    const user = await this.findById(id);
    return await user.update(updateDTO);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    return await user.update({ isDeleted: true });
  }
}
