import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { CreateSupplierDto, QuerySupplierDto, UpdateSupplierDto } from './dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(@InjectRepository(Supplier) private readonly repo: EntityRepository<Supplier>) {}

  async create(attrs: CreateSupplierDto) {
    const supplier = this.repo.create(attrs);
    await this.repo.persistAndFlush(supplier);
    return supplier;
  }

  async findAll(_query?: QuerySupplierDto) {
    const [data, number] = await this.repo.findAndCount({}, { orderBy: { id: 'DESC' } });
    return { data, number };
  }

  async findOne(id: number) {
    const supplier = await this.repo.findOne({ id });
    if (!supplier) return null;

    return supplier;
  }

  async update(id: number, _attrs: UpdateSupplierDto) {
    const supplier = await this.repo.findOne({ id });
    if (!supplier) return null;

    this.repo.assign(supplier, _attrs);
    await this.repo.flush();

    return supplier;
  }

  async remove(id: number) {
    const supplier = await this.repo.findOne({ id });
    if (!supplier) return null;

    await this.repo.removeAndFlush(supplier);
    return supplier;
  }
}
