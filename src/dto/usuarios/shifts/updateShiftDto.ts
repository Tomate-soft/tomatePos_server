import { IsOptional, IsString } from 'class-validator';

export class updateShiftDto {
  @IsString()
  @IsOptional()
  shiftName?: string;

  @IsString()
  @IsOptional()
  timeStartShift?: string;

  @IsString()
  @IsOptional()
  timeEndShift?: string;
}
