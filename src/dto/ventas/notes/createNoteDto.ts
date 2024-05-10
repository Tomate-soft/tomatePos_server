import {
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class createNoteDto {
  @IsDefined()
  @IsString()
  checkCode: string;

  @IsDefined()
  @IsString()
  accountId: string;

  @IsOptional()
  @Length(1, 15)
  noteName?: string;

  @IsDefined()
  @IsString()
  paymentCode: string;

  @IsDefined()
  @IsString()
  sellType: string;

  @IsDefined()
  @IsString()
  user: string;

  @IsArray()
  products: [];

  @IsString()
  checkTotal: string;

  @IsDefined()
  @IsString()
  status: 'enabled' | 'disabled' | 'pending' | 'cancel';

  @IsDefined()
  @IsString()
  cashier: string;

  @IsString()
  paymentDate: string;
}
