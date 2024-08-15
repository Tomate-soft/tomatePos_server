import { IsString, Length, IsOptional, IsArray } from 'class-validator';

export class UpdateBillDto {
  @IsOptional()
  @IsString()
  @Length(1, 6)
  sellType?: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsString()
  checkTotal?: string;

  @IsOptional()
  @IsString()
  status?: 'enabled' | 'disabled' | 'pending' | 'cancel';

  @IsOptional()
  @IsArray()
  products?: [];

  @IsOptional()
  @IsArray()
  payment?: string[];

  @IsOptional()
  @IsString()
  tableNum?: string;

  @IsOptional()
  @IsString()
  table?: string;

  @IsOptional()
  @IsString()
  billName?: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsArray()
  notes?: [];

  @IsOptional()
  @IsArray()
  transferHistory?: string[];

  @IsOptional()
  cashierSession?: string;

  @IsOptional()
  @IsString()
  discount?: string;

  @IsOptional()
  @IsString()
  operatingPeriod?: string;

  /*
  @IsDefined()
  @IsString()
  devide: string;
  */
}
