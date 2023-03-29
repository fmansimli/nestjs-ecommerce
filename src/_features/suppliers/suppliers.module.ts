import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';

import { Supplier } from './entities/supplier.entity';
import { Address } from '../addresses/entities/address.entity';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [MikroOrmModule.forFeature({ entities: [Supplier, Address] })],
})
export class SuppliersModule {}
