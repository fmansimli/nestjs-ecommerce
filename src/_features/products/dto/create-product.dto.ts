import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  name: string;

  @IsNumber()
  @MinLength(5)
  @MaxLength(50)
  price: number;

  @IsString()
  @MinLength(10)
  description: string;
}
