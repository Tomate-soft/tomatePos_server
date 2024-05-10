import { IsString, Length, IsOptional } from 'class-validator';

export class updateMenusYRecetasDto {
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
  productName?: string;

  @IsString()
  @Length(1, 5)
  @IsOptional()
  serving?: string;

  @IsString()
  @Length(1, 6)
  @IsOptional()
  unit?: 'gr' | 'kg' | 'L' | 'mm' | 'bolsas';

  @IsString()
  @Length(1, 6)
  @IsOptional()
  priceNotIVA?: string;

  @IsString()
  @Length(1, 6)
  @IsOptional()
  recommendedPrice?: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
