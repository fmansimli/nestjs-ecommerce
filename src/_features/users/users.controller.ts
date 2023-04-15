import { Get, Body, Param, Post, Patch, Controller, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

import { JwtGuard } from 'src/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }
}
