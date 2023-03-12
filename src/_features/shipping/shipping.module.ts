import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { Shipping } from './entities/shipping.entity';

@Module({
  controllers: [ShippingController],
  providers: [ShippingService],
  imports: [MikroOrmModule.forFeature([Shipping])],
})
export class ShippingModule {}
