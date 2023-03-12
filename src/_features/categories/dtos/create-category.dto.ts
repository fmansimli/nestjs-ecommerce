import { IsString, MinLength, MaxLength } from 'class-validator';

export class createCategoryDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;
}
