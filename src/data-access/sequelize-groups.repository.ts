import { UpdateGroupDto } from './../groups/dto/update-group.dto';
import { CreateGroupDto } from './../groups/dto/create-group.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { GroupsRepository } from 'src/groups/interfaces/groups.repository';
import { Group } from './../groups/entities/group.entity';

@Injectable()
export class SequelizeGroupsRepository implements GroupsRepository<Group> {
  constructor(@InjectModel(Group) private groupModel: typeof Group) {}

  async findAll() {
    return await this.groupModel.findAll();
  }

  async findById(id: string) {
    return await this.groupModel.findOne({
      where: { id },
    });
  }

  async create(createDTO: CreateGroupDto) {
    return await this.groupModel.create(createDTO);
  }

  async update(id: string, updateDTO: UpdateGroupDto) {
    const group = await this.findById(id);
    return await group.update(updateDTO);
  }

  async delete(id: string) {
    const group = await this.findById(id);
    return await group.destroy({});
  }
}
