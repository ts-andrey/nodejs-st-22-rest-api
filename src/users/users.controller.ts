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
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUsersFilterDTO } from './dto/get-users-filter.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return {
      createdUser: this.usersServise.createUser(createUserDTO),
    };
  }

  @Get()
  getAllUsers(@Query() getUsersFilterDTO: GetUsersFilterDTO) {
    return {
      data: this.usersServise.getAllUsers(getUsersFilterDTO),
    };
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return { data: this.usersServise.getUser(userId) };
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body('login') updateUserDTO: UpdateUserDTO,
  ) {
    console.log(updateUserDTO);
    return {
      updatedUser: this.usersServise.updateUser(userId, updateUserDTO),
    };
  }

  @Delete(':userId')
  removeUser(@Param('userId') userId: string) {
    return { removedUser: this.usersServise.removeUser(userId) };
  }

  @Get('allData')
  getAllData() {
    return this.usersServise.getAllData();
  }
}
