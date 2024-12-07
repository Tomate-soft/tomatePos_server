import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  Length,
  IsDefined,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';

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

export class updateDishesDto {
  @IsString()
  @Length(1, 35)
  @IsOptional()
  category?: string;

  @IsString()
  @Length(1, 16)
  @IsOptional()
  code?: string;

  @IsString()
  @Length(1, 35)
  @IsOptional()
  dishesName?: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disable' | 'enable';

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ArrayNotEmpty()
  prices: PriceDto[];
}
