import { IsString, Length, IsDefined, IsNotEmpty } from 'class-validator';

export class CreatePrinterDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  printerName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  tcp: string;
}
