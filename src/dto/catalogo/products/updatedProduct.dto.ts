import { IsString, IsNumber, IsOptional, Length } from 'class-validator';

export class updateProductDto {
  @IsString()
  @Length(1, 16)
  @IsOptional()
  code?: string;

  @IsString()
  @Length(1, 35)
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  productName?: string;

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

  @IsOptional()
  @Length(1, 2)
  quantity?: number;

  @IsString()
  @IsOptional()
  priceInSiteBill?: string;

  @IsString()
  @IsOptional()
  priceToGoBill?: string;

  @IsString()
  @IsOptional()
  priceCallOrderBill?: string;

  @IsString()
  @IsOptional()
  priceDeliveryBill?: string;

  @IsOptional()
  active: boolean;
}
