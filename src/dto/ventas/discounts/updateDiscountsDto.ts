import { IsString, IsOptional } from 'class-validator';

export class UpdateDiscountDto {
  @IsOptional()
  @IsString()
  checkCode?: string;

  @IsOptional()
  @IsString()
  sellType?: string; // este sera un enum

  @IsOptional()
  @IsString()
  checkTotal?: string;

  @IsOptional()
  @IsString()
  discountMount?: string;

  @IsOptional()
  @IsString()
  discountByUser?: string;

  @IsOptional()
  @IsString()
  discountFor?: string;

  @IsOptional()
  @IsString()
  discountReason?: string;

  // Verificar si esta prop se va quedar
  @IsOptional()
  @IsString()
  discountDate?: string;

  // verificar si esta prop se va quedar
  @IsOptional()
  @IsString()
  checkStatus?: 'enabled' | 'disabled';
}
