import { IsString, MinLength, MaxLength, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class createCategoryDto {
  @ValidateNested({ each: true })
  @Type(() => LocaleDto)
  locales: LocaleDto[];
}

export class LocaleDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNumber()
  lang: number;
}
