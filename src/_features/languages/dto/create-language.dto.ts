import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(6)
  prefix: string;
}
