import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CategoryLocale } from './entities/category-locale.entity';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [MikroOrmModule.forFeature({ entities: [Category, CategoryLocale] })],
})
export class CategoriesModule {}
