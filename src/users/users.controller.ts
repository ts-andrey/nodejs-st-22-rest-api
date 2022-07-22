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
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}

  @Post()
  createUser(
    @Body('login') userLogin: string,
    @Body('password') userPassword: string,
    @Body('age') userAge: number,
  ) {
    return {
      createdUser: this.usersServise.createUser(
        userLogin,
        userPassword,
        userAge,
      ),
    };
  }

  @Get()
  getAllUsers(@Query() query) {
    if (query.loginSubstring && query.limit) {
      return {
        data: this.usersServise.getAllUsers({
          loginSubstring: query.loginSubstring,
          limit: query.limit,
        }),
      };
    } else {
      return {
        data: this.usersServise.getAllUsers({
          loginSubstring: null,
          limit: null,
        }),
      };
    }
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return { data: this.usersServise.getUser(userId) };
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body('login') userLogin: string,
    @Body('password') userPassword: string,
    @Body('age') userAge: number,
  ) {
    return {
      updatedUser: this.usersServise.updateUser(
        userId,
        userLogin,
        userPassword,
        userAge,
      ),
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
