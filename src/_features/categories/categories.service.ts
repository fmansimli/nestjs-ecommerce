import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

import { QueryCategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dtos';

import { Category } from './entities/category.entity';
import { CategoryLocale } from './entities/category-locale.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: EntityRepository<Category>,
    @InjectRepository(CategoryLocale) private readonly localeRepo: EntityRepository<CategoryLocale>,
  ) {}

  async find(query?: QueryCategoryDto) {
    const { fields, populate, lang = 'az' } = query || {};

    const ctgs = await this.localeRepo.find(
      { lang: { prefix: lang } },
      { fields: fields as any, populate: populate as any },
    );
    return ctgs;
  }

  async findById(id: number, _query?: QueryCategoryDto) {
    const { fields, populate } = _query || {};

    const ctg = await this.repo.findOne(
      { id },
      {
        populate: populate as any,
        fields: fields as any,
      },
    );
    return ctg;
  }

  async create(body: CreateCategoryDto) {
    const { locales, ...category } = body;

    const _category = this.repo.create(category);

    for (const locale of locales) {
      const _locale = this.localeRepo.create(locale);
      _locale.category = _category;
    }
    await this.repo.persistAndFlush(_category);
    return _category;
  }

  async update(id: number, body: UpdateCategoryDto) {
    const { locales, ...category } = body;

    const _category = await this.repo.findOne({ id }, { populate: ['locales'] });
    if (!_category) return null;

    this.repo.assign(_category, category);

    for (const locale of _category.locales) {
      this.localeRepo.assign(
        locale,
        locales.find((l) => l.id === locale.id),
      );
    }

    this.repo.flush();
    return _category;
  }

  async deleteById(id: number) {
    const category = await this.repo.findOne({ id });
    if (!category) return null;

    this.repo.remove(category);
    await this.repo.flush();
    return category;
  }
}
