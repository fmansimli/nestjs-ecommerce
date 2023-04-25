import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { CreateSupplierDto, QuerySupplierDto, UpdateSupplierDto } from './dto';

import { Supplier } from './entities/supplier.entity';
import { Address } from '../addresses/entities/address.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier) private readonly repo: EntityRepository<Supplier>,
    @InjectRepository(Address) private readonly addresRepo: EntityRepository<Address>,
  ) {}

  async create(body: CreateSupplierDto) {
    const { address, ...rest } = body;

    const supplier = this.repo.create(rest);
    supplier.address = new Address(address);

    await this.repo.persistAndFlush(supplier);
    return supplier;
  }

  async findAll(_query?: QuerySupplierDto) {
    const { populate, fields } = _query || {};

    const [data, count] = await this.repo.findAndCount(
      {},
      {
        orderBy: { id: 'DESC' },
        populate: populate as any[],
        fields: fields as any[],
      },
    );
    return { data, count };
  }

  async findOne(id: number, _query?: QuerySupplierDto) {
    const { populate, fields } = _query || {};

    const supplier = await this.repo.findOne(
      { id },
      { populate: populate as any[], fields: fields as any[] },
    );
    if (!supplier) return null;

    return supplier;
  }

  async update(id: number, body: UpdateSupplierDto) {
    const { address, ...attrs } = body;

    const supplier = await this.repo.findOne({ id }, { populate: ['address'] });
    if (!supplier) return null;

    this.repo.assign(supplier, attrs);

    this.addresRepo.upsert(new Address(address));

    await this.repo.flush();

    return { ...supplier, address };
  }

  async remove(id: number) {
    const supplier = await this.repo.findOne({ id });
    if (!supplier) return null;

    await this.repo.removeAndFlush(supplier);
    return supplier;
  }
}
