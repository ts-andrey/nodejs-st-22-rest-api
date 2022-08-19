import { AuthService } from './../services/auth.service';
import { LoginDTO } from './../dto/login.dto';
import { Body, Controller, NotFoundException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const token = await this.authService.getUserToken(loginDto);
    if (!token) {
      throw new NotFoundException('No such user was found :(');
    }
  }
}
