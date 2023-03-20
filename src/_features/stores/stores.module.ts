import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [MikroOrmModule.forFeature({ entities: [Store] })],
})
export class StoresModule {}
