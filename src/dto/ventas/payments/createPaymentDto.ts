import { IsString, IsDefined, IsOptional } from 'class-validator';

export interface Transaction {
  paymentType: string;
  quantity: string;
}

export class CreatePaymentDto {
  @IsString()
  @IsDefined()
  accountId: string;

  @IsOptional()
  @IsString()
  paymentCode?: string;

  @IsDefined()
  @IsString()
  check: string;

  @IsOptional()
  @IsString()
  noteCode?: string;

  @IsString()
  checkTotal: string;

  @IsString()
  tips: string;

  transactions: Transaction[];

  @IsString()
  paymentTotal: string;

  @IsDefined()
  cashier: string;

  @IsString()
  paymentDate: string;

  billing: boolean;

  @IsString()
  @IsDefined()
  difference: string;
}
