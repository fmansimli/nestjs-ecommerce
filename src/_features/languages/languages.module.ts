import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { Language } from './entities/language.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Language])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
