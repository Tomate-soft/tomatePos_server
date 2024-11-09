import {
  IsString,
  IsDefined,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  ValidateNested,
  IsEnum,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Status {
  DISABLED = 'disabled',
  ENABLED = 'enabled',
}

enum Prices {
  ONSITE = 'ONSITE',
  TOGO = 'TOGO',
  RAPPI = 'RAPPI',
  PHONE = 'PHONE',
}

class PriceDto {
  @IsEnum(Prices)
  @IsNotEmpty()
  name: Prices;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ArrayNotEmpty()
  prices: PriceDto[];
}
