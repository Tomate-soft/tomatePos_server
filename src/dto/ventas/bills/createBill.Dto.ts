import {
  IsString,
  IsDefined,
  Length,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateBillDto {
  @IsDefined()
  @IsString()
  @Length(1, 6)
  sellType: 'onSite' | 'toGo' | 'rappi' | 'phone';

  @IsDefined()
  @IsString()
  user: string;

  @IsDefined()
  @IsString()
  checkTotal: string;

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

  /*
  @IsDefined()
  @IsString()
  devide: string;
  */
}
