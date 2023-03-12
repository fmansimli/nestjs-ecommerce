import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';

import { Address } from './entities/address.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
