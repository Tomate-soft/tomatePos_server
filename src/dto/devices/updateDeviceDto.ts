import { IsOptional, IsString } from 'class-validator';
import { Setting } from 'src/schemas/setting/setting.schema';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  deviceName?: string;

  @IsOptional()
  settings?: Setting[];

  @IsOptional()
  status?: boolean;

  @IsOptional()
  printers: string[];
}
