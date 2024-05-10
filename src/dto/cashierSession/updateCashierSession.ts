import { IsOptional, IsString } from 'class-validator';

export class updateCashierSessionDto {
  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  bills?: [];

  @IsOptional()
  @IsString()
  endDate: string;

  @IsOptional()
  @IsString()
  enable: string;

  @IsOptional()
  @IsString()
  totalDebit: string;

  @IsOptional()
  @IsString()
  totalCredit: string;

  @IsOptional()
  @IsString()
  totalCash: string;
}
