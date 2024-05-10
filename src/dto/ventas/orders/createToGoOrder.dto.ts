import { IsArray, IsString } from 'class-validator';

export class createToGoOrderDto {
  @IsString()
  code: string;

  @IsString()
  user: string;

  @IsString()
  checkTotal: string;

  @IsString()
  status: string;

  @IsArray()
  products: [];

  @IsArray()
  payment: [];
}
