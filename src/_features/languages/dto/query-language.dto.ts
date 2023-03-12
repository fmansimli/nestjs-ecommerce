import { IsOptional, IsString, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryLangDto {
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @Transform(({ value }) => value.split(','))
  fields: string[];
}
