import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [MikroOrmModule.forFeature({ entities: [Payment] })],
})
export class PaymentsModule {}
