import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const authData = await this.authService.login(body);
    if (!authData) {
      throw new BadRequestException('email or password is incorrect!');
    }
    return authData;
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
