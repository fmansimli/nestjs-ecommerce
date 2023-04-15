import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

import { Password } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(attrs: LoginDto) {
    const user = await this.usersService.findByEmail(attrs.email);
    if (!user) return null;

    const result = await Password.compare(user.password, attrs.password);
    if (!result) return null;

    const { id, email, password: _never, ...rest } = user;
    const accessToken = this.jwtService.sign({ id, email, claims: ['all'] });

    return { auth: { accessToken }, user: { id, email, ...rest } };
  }

  async register(body: RegisterDto) {
    const user = await this.usersService.create(body);
    return user;
  }
}
