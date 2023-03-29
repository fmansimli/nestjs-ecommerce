import { IsString, IsEmail, IsPhoneNumber, MinLength, MaxLength, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class NestedAddressDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  country: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  state: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  city: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  street: string;
}

export class UpdateSupplierDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('AZ')
  phone: string;

  @ValidateNested()
  @Type(() => NestedAddressDto)
  address: NestedAddressDto;
}
