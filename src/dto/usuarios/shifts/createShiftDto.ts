import { IsDefined, IsString } from 'class-validator';

export class createShiftDto {
  @IsString()
  @IsDefined()
  shiftName: string;

  @IsString()
  @IsDefined()
  timeStartShift: string;

  @IsString()
  @IsDefined()
  timeEndShift: string;
}
