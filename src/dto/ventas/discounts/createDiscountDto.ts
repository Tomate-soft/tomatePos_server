import { IsString, IsDefined, IsOptional } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsOptional()
  accountId: string;

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
  @IsDefined()
  discountType: string;

  @IsDefined()
  @IsString()
  discountMount: string;

  @IsDefined()
  @IsString()
  setting: string;

  @IsString()
  discountByUser: string;

  @IsString()
  discountFor: string;

  @IsString()
  discountReason: string;
}
