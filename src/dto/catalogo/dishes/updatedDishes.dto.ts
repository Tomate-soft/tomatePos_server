import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  priceInSite?: number;

  @IsNumber()
  @IsOptional()
  priceToGo?: number;

  @IsNumber()
  @IsOptional()
  priceCallOrder?: number;

  @IsNumber()
  @IsOptional()
  priceDelivery?: number;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
