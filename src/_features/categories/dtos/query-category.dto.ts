import { IsString, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.split(','))
  populate?: string[];

  @IsOptional()
  @IsString()
  @MinLength(1)
  @Transform(({ value }) => value.split(','))
  fields: string[];
}
