import { IsOptional, IsString } from 'class-validator';

export class updateCashierSessionDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  bills?: [];

  @IsOptional()
  togoorders?: string[];

  @IsOptional()
  rappiOrders?: string[];

  @IsOptional()
  phoneOrders?: string[];

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  enable?: string;

  @IsOptional()
  @IsString()
  totalDebit?: string;

  @IsOptional()
  @IsString()
  totalCredit?: string;

  @IsOptional()
  @IsString()
  totalCash?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  cashRequest?: string;
}
