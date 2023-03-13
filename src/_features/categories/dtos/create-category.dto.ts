import { IsString, MinLength, MaxLength, ValidateNested,IsNumber } from 'class-validator';

export class createCategoryDto {
  @ValidateNested({ each: true })
  locales: LocaleDto[];
}

class LocaleDto {
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
