import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class QueryCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  populate?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  fields?: string;
}
