import { IsString, IsOptional } from 'class-validator';

export class UpdateDiscountDto {
  @IsString()
  accountId?: string;

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
