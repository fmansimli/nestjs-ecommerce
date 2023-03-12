import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './entities/supplier.entity';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [MikroOrmModule.forFeature([Supplier])],
})
export class SuppliersModule {}
