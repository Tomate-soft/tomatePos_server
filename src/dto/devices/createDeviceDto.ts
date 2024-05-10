import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Setting } from 'src/schemas/setting/setting.schema';

export class CreateDeviceDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  deviceIdn: string;

  @IsOptional()
  settings: Setting[];
}
