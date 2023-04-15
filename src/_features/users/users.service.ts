import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Password } from 'src/utils';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: EntityRepository<User>) {}

  async findByEmail(email: string) {
    const user = await this.repo.findOne({ email });

    if (!user) return null;
    return user;
  }

  async findById(id: number) {
    const user = await this.repo.findOne({ id });

    if (!user) return null;
    return user;
  }

  async create(body: CreateUserDto) {
    const { email, password } = body;

    const hashed = await Password.toHash(password);

    const user = this.repo.create({ email, password: hashed });
    await this.repo.persistAndFlush(user);

    return user;
  }

  async update(id: number, attrs: UpdateUserDto) {
    const user = await this.repo.findOne({ id });
    if (!user) return null;

    this.repo.assign(user, attrs);
    await this.repo.flush();

    return user;
  }

  findAll() {
    return this.repo.findAll();
  }
}
