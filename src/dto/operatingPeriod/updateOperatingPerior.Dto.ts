import { IsOptional } from 'class-validator';

export class updateOperatingPeriodDto {
  @IsOptional()
  status: boolean;

  @IsOptional()
  dailyRegisters: string[];

  @IsOptional()
  sellProcess: string[];

  @IsOptional()
  withdrawals: string;
}
// Compare this snippet from src/dto/catalogo/products/createProduct.dto.ts:
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
