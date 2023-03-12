import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { QueryCategoryDto, createCategoryDto, UpdateCategoryDto } from './dtos';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: EntityRepository<Category>) {}

  async find(query?: QueryCategoryDto) {
    if (Object?.keys(query).length) {
    }
    const ctgs = await this.repo.findAll({ orderBy: { id: 'DESC' } });
    return ctgs;
  }

  async findById(id: number, _query?: QueryCategoryDto) {
    const ctg = await this.repo.findOne({ id });
    return ctg;
  }

  async create(category: any) {
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
    category.locales.removeAll();
    this.repo.remove(category);
    this.repo.flush();
    return category;
  }
}
