import {
  IsString,
  IsDefined,
  Length,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateBillDto {
  @IsDefined()
  @IsString()
  user: string;

  @IsString()
  userId: string;

  @IsDefined()
  @IsString()
  checkTotal: string;

  @IsOptional()
  @IsString()
  @Length(1, 6)
  sellType?: string;

  @IsDefined()
  @IsString()
  status: 'enabled' | 'disabled' | 'pending' | 'cancel';

  @IsArray()
  products: [];

  @IsArray()
  payment: [];

  @IsDefined()
  @IsString()
  tableNum: string;

  @IsDefined()
  @IsString()
  table: string;

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
