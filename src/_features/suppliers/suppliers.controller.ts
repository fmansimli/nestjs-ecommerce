import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, QuerySupplierDto, UpdateSupplierDto } from './dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(@Query() query: QuerySupplierDto) {
    return this.suppliersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query() query: QuerySupplierDto) {
    const supplier = await this.suppliersService.findOne(+id, query);
    if (!supplier) {
      throw new NotFoundException('supplier not found!');
    }
    return supplier;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.suppliersService.update(+id, updateSupplierDto);
    if (!supplier) {
      throw new NotFoundException('supplier not found!');
    }
    return supplier;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const supplier = await this.suppliersService.remove(+id);
    if (!supplier) {
      throw new NotFoundException('supplier not found!');
    }
    return supplier;
  }
}
