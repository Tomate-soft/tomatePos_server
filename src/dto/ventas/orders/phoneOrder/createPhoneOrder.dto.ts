import { IsArray, IsOptional, IsString } from 'class-validator';

export class createPhoneDto {
  @IsString()
  user: string;

  @IsString()
  userId: string;

  @IsString()
  userCode: string;

  @IsString()
  checkTotal: string;

  @IsString()
  status: string;

  @IsArray()
  products: [];

  @IsArray()
  payment: [];

  @IsString()
  @IsOptional()
  orderName: string;
}
