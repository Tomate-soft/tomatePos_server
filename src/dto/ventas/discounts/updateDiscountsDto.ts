import { IsString, IsOptional } from 'class-validator';

export class UpdateDiscountDto {
  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  @IsOptional()
  noteAccountId?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  rappiAccountId: string;

  @IsString()
  @IsOptional()
  phoneAccountId: string;

  @IsString()
  @IsOptional()
  toGoAccountId: string;

  @IsString()
  discountType?: string;

  @IsString()
  discountMount?: string;

  @IsString()
  setting?: string;

  @IsString()
  discountByUser?: string;

  @IsString()
  discountFor?: string;

  @IsString()
  discountReason?: string;
}
