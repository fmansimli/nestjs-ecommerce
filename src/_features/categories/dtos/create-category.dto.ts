import { IsString, MinLength, MaxLength, ValidateNested } from 'class-validator';

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

  @IsString()
  @MinLength(2)
  @MaxLength(5)
  lang: number;
}
