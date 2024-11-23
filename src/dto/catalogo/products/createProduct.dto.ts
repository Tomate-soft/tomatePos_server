import {
  IsString,
  IsDefined,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsEnum,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Prices {
  ONSITE = 'ON_SITE',
  TOGO = 'TOGO',
  RAPPI = 'RAPPI',
  PHONE = 'PHONE',
  PRICE_LIST_FIVE = 'PRICE_LIST_FIVE',
  PRICE_LIST_SIX = 'PRICE_LIST_SIX',
  PRICE_LIST_SEVEN = 'PRICE_LIST_SEVEN',
  PRICE_LIST_EIGHT = 'PRICE_LIST_EIGHT',
  PRICE_LIST_NINE = 'PRICE_LIST_NINE',
  PRICE_LIST_TEN = 'PRICE_LIST_TEN',
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

  @IsOptional()
  group?: string;
}
