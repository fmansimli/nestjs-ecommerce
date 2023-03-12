import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { QueryLangDto } from './dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  create(@Body() body: CreateLanguageDto) {
    return this.languagesService.create(body);
  }

  @Get()
  findAll(@Query() query?: QueryLangDto) {
    return this.languagesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() query?: QueryLangDto) {
    const language = await this.languagesService.findOne(id, query);
    if (!language) {
      throw new NotFoundException('Language not found!');
    }
    return language;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateLanguageDto) {
    const language = await this.languagesService.update(id, body);
    if (!language) {
      throw new NotFoundException('Language not found!');
    }
    return language;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const language = await this.languagesService.remove(id);
    if (!language) {
      throw new NotFoundException('Language not found!');
    }
    return language;
  }
}
