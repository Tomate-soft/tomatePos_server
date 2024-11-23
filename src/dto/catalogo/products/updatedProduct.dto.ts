import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  ValidateNested,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Status {
  DISABLED = 'disabled',
  ENABLED = 'enabled',
}

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

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(1, 16)
  code?: string;

  @IsOptional()
  @IsString()
  @Length(1, 35)
  category?: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @IsArray()
  prices?: PriceDto[];

  @IsOptional()
  group?: string;
}
