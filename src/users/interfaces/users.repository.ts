import { UpdateUserDTO } from './../dto/update-user.dto';
import { CreateUserDTO } from './../dto/create-user.dto';
import { Repository } from 'src/interfaces/repository.interface';
import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';

export interface UsersRepository<Type>
  extends Repository<
    Type,
    string,
    GetUsersFilterDTO,
    CreateUserDTO,
    UpdateUserDTO
  > {
  findById(id: string): Type;
  findAll(filterDTO: GetUsersFilterDTO): Type[];
  create(createDTO: CreateUserDTO): Type;
  update(id: string, updateDTO: UpdateUserDTO): Type;
  delete(id: string): Type;
}
