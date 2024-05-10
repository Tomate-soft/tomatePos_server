import { IsString, Length, IsOptional } from 'class-validator';

export class UpdatePrinterDto {
  @IsOptional()
  @IsString()
  @Length(1, 15)
  printerName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  tcp?: string;
}
