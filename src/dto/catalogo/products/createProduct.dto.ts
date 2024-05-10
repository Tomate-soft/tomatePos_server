import {
  IsString,
  IsDefined,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
export class createProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 16)
  code: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 35)
  category: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsOptional()
  priceInSite?: string;

  @IsString()
  @IsOptional()
  priceToGo?: string;

  @IsString()
  @IsOptional()
  priceCallOrder?: string;

  @IsString()
  @IsOptional()
  priceDelivery?: string;

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
