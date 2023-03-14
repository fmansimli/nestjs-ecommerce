import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { QueryCategoryDto, createCategoryDto } from './dtos';
import { Category } from './entities/category.entity';
import { CategoryLocale } from './entities/category-locale.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: EntityRepository<Category>,
    @InjectRepository(CategoryLocale) private readonly localeRepo: EntityRepository<CategoryLocale>,
  ) {}

  async find(query?: QueryCategoryDto) {
    const { fields, populate, lang="az" } = query || {};

    const ctgs = await this.localeRepo.find({ lang: { prefix: lang } });
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

  async create(category: createCategoryDto) {
    const newCategory = this.repo.create(category);
    await this.repo.persistAndFlush(newCategory);
    return newCategory;
  }

  async update(id: number, attrs: any) {
    const category = await this.repo.findOne({ id });
    if (!category) return null;

    this.repo.assign(category, attrs);
    this.repo.flush();
    return category;
  }

  async deleteById(id: number) {
    const category = await this.repo.findOne({ id });
    if (!category) return null;

    this.repo.remove(category);
    await this.repo.flush();
    return category;
  }
}
