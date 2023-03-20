import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [MikroOrmModule.forFeature({ entities: [Review] })],
})
export class ReviewsModule {}
