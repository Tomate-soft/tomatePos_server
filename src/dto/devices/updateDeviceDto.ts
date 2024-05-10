import { IsOptional, IsString } from 'class-validator';
import { Setting } from 'src/schemas/setting/setting.schema';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  deviceIdn: string;

  @IsOptional()
  settings: Setting[];
}
