import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { SequelizeGroupsRepository } from 'src/data-access/sequelize-groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: SequelizeGroupsRepository) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupsRepository.create(createGroupDto);
  }

  findAll() {
    return this.groupsRepository.findAll();
  }

  findOne(id: string) {
    return this.groupsRepository.findById(id);
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupsRepository.update(id, updateGroupDto);
  }

  remove(id: string) {
    return this.groupsRepository.delete(id);
  }
}
