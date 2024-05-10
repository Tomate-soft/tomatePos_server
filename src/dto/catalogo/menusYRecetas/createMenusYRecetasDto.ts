import {
  IsString,
  Length,
  IsDefined,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class createMenusYRecetasDto {
  @IsString()
  @Length(1, 35)
  @IsDefined()
  @IsNotEmpty()
  category: string;

  @IsString()
  @Length(1, 16)
  @IsDefined()
  @IsNotEmpty()
  code: string;

  @IsString()
  @Length(1, 35)
  @IsDefined()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @Length(1, 5)
  @IsDefined()
  @IsNotEmpty()
  serving: string;

  @IsString()
  @Length(1, 6)
  @IsDefined()
  @IsNotEmpty()
  unit: 'gr' | 'kg' | 'L' | 'mm' | 'bolsas';

  @IsString()
  @Length(1, 6)
  @IsDefined()
  @IsNotEmpty()
  priceNotIVA: string;

  @IsString()
  @Length(1, 6)
  @IsDefined()
  @IsNotEmpty()
  recommendedPrice: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
