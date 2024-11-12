import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Setting } from 'src/schemas/setting/setting.schema';

export class CreateDeviceDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  deviceName: string;

  @IsOptional()
  settings: Setting[];
}
