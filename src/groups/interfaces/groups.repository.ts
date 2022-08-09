import { UpdateGroupDto } from './../dto/update-group.dto';
import { CreateGroupDto } from './../dto/create-group.dto';
import { Repository } from 'src/interfaces/repository.interface';

export interface GroupsRepository<Type>
  extends Repository<string, null, CreateGroupDto, UpdateGroupDto> {
  findById(id: string): Promise<Type>;
  findAll(): Promise<Type[]>;
  create(createDTO: CreateGroupDto): Promise<Type>;
  update(id: string, updateDTO: UpdateGroupDto): Promise<Type>;
  delete(id: string): void;
}
