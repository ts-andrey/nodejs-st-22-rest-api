import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUsersFilterDTO } from '../dto/get-users-filter.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersServise.createUser(createUserDTO);
  }

  @Get()
  async getAllUsers(@Query() getUsersFilterDTO: GetUsersFilterDTO) {
    const users = await this.usersServise.getAll(getUsersFilterDTO);
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const user = this.usersServise.getUser(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersServise.updateUser(id, updateUserDTO);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersServise.removeUser(id);
  }
}
