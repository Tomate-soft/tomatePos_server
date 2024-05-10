import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class UpdateSellTypeDto {
  @IsOptional()
  @IsNumber()
  @Length(1, 35)
  code?: number;

  @IsOptional()
  @Length(1, 35)
  @IsString()
  SellName?: string;

  @IsOptional()
  @Length(1, 35)
  @IsString()
  color?: string;

  @IsOptional()
  @Length(1, 35)
  @IsString()
  status?: 'enabled' | 'disabled';
}
