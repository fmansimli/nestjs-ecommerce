import { IsString, MinLength, MaxLength, ValidateNested, IsNumber, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class createCategoryDto {
  @ValidateNested({ each: true })
  @Type(() => LocaleDto)
  @ArrayMinSize(2)
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
