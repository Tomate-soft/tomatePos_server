import { IsString, IsDefined } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsDefined()
  checkCode: string;
  @IsDefined()
  @IsString()
  sellType: string; // este sera un enum

  @IsString()
  checkTotal: string;

  @IsString()
  discountMount: string;

  @IsString()
  discountByUser: string;

  @IsString()
  discountFor: string;

  @IsString()
  discountReason: string;

  // Verificar si esta prop se va quedar
  @IsString()
  discountDate: string;

  // verificar si esta prop se va quedar
  @IsString()
  checkStatus: 'enabled' | 'disabled';
}
