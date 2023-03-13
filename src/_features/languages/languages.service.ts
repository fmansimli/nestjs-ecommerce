import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Language } from './entities/language.entity';
import { CreateLanguageDto, QueryLangDto, UpdateLanguageDto } from './dto';

@Injectable()
export class LanguagesService {
  constructor(@InjectRepository(Language) private readonly repo: EntityRepository<Language>) {}

  create(lang: CreateLanguageDto) {
    const language = this.repo.create(lang);
    this.repo.persistAndFlush(language);
    return language;
  }

  async findAll(query?: QueryLangDto) {
    const { fields } = query;

    const languages = await this.repo.findAll({ fields: fields as any });

    return languages;
  }

  async findOne(id: number, query?: QueryLangDto) {
    const { fields } = query;

    const language = await this.repo.findOne({ id }, { fields: fields as any });
    return language;
  }

  async update(id: number, attrs: UpdateLanguageDto) {
    const language = await this.repo.findOne({ id });
    if (!language) return null;

    this.repo.assign(language, attrs);
    this.repo.flush();
    return language;
  }

  async remove(id: number) {
    const language = await this.repo.findOne({ id });
    if (!language) return null;

    await this.repo.removeAndFlush(language);
    return language;
  }
}
