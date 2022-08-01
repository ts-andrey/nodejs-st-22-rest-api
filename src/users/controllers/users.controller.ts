import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
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
  getAllUsers(@Query() getUsersFilterDTO: GetUsersFilterDTO) {
    return this.usersServise.getAllUsers(getUsersFilterDTO);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.usersServise.getUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.usersServise.updateUser(userId, updateUserDTO);
  }

  @Delete(':userId')
  removeUser(@Param('userId') userId: string) {
    return this.usersServise.removeUser(userId);
  }
}
