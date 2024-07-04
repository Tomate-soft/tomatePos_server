import { IsArray, IsOptional, IsString } from 'class-validator';

export class updateRappiOrderDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  checkTotal: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsArray()
  products: [];

  @IsOptional()
  @IsArray()
  payment: [];

  @IsString()
  @IsOptional()
  orderName: string;
}
