import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './dtos';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll(@Query() query?: QueryCategoryDto) {
    return this.categoriesService.find(query);
  }

  @Get(':id')
  async getById(@Query() query: QueryCategoryDto, @Param('id') id: number) {
    const category = await this.categoriesService.findById(id, query);
    if (!category) throw new NotFoundException('Category Not Found');
    return category;
  }

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @Patch(':id')
  async editById(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, body);
    if (!category) {
      throw new NotFoundException('Category Not Found!');
    }
    return category;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    const category = await this.categoriesService.deleteById(id);
    if (!category) {
      throw new NotFoundException('Category Not Found!');
    }
    return category;
  }
}
