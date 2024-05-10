import { IsString, IsOptional, IsArray, Length } from 'class-validator';

export class updateNoteDto {
  @IsOptional()
  @IsString()
  checkCode?: string;

  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @Length(1, 15)
  noteName?: string;

  @IsOptional()
  @IsString()
  paymentCode?: string;

  @IsOptional()
  @IsString()
  sellType?: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsOptional()
  @IsArray()
  products?: [];

  @IsOptional()
  @IsString()
  checkTotal?: string;

  @IsOptional()
  @IsString()
  status?: 'enabled' | 'disabled' | 'pending' | 'cancel';

  @IsOptional()
  @IsString()
  cashier?: string;

  @IsOptional()
  @IsString()
  paymentDate?: string;
}
