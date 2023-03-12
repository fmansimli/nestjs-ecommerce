import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { Coupon } from './entities/coupon.entity';

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [MikroOrmModule.forFeature([Coupon])],
})
export class CouponsModule {}
