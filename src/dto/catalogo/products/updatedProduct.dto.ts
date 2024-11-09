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
}
