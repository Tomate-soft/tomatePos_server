import { Type } from 'class-transformer';
import {
  IsString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  Length,
  IsEnum,
  IsNumber,
  ValidateNested,
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

export class createDishesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 35)
  category: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 16)
  code: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 35)
  dishesName: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => PriceDto)
  @ArrayNotEmpty()
  prices: PriceDto[];
}
