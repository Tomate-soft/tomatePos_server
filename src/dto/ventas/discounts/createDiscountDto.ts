import { IsString, IsDefined } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsDefined()
  accountId: string;

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
