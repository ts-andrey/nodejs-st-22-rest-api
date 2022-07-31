import { UpdateUserDTO } from './../dto/update-user.dto';
import { CreateUserDTO } from './../dto/create-user.dto';
import { User } from 'src/users/models/user.model';
import { Repository } from 'src/interfaces/repository.interface';
import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';

export interface UsersRepository
  extends Repository<
    User,
    string,
    GetUsersFilterDTO,
    CreateUserDTO,
    UpdateUserDTO
  > {
  findById(id: string): User;
  findAll(filterDTO: GetUsersFilterDTO): User[];
  create(createDTO: CreateUserDTO): User;
  update(id: string, updateDTO: UpdateUserDTO): User;
  delete(id: string): User;
}
