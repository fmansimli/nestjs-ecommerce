import { IsString, MinLength, MaxLength, ValidateNested, IsNumber, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto {
  @ValidateNested({ each: true })
  @Type(() => LocaleDto)
  @ArrayMinSize(1)
  locales: LocaleDto[];
}

class LocaleDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

}
