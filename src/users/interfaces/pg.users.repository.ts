import { UpdateUserDTO } from './../dto/update-user.dto';
import { CreateUserDTO } from './../dto/create-user.dto';
import { Repository } from 'src/interfaces/repository.interface';
import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';

export interface AsyncUsersRepository<Type>
  extends Repository<string, GetUsersFilterDTO, CreateUserDTO, UpdateUserDTO> {
  findById(id: string): Promise<Type>;
  findAll(filterDTO: GetUsersFilterDTO): Promise<Type[]>;
  create(createDTO: CreateUserDTO): Promise<Type>;
  update(id: string, updateDTO: UpdateUserDTO): Promise<Type>;
  delete(id: string): Promise<Type>;
}
