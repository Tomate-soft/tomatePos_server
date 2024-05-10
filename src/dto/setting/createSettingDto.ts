import { IsOptional } from 'class-validator';
import { Printer } from 'src/schemas/configuracion/printer.schema';

export class CreateSettingDto {
  @IsOptional()
  printers?: Printer[];
}
