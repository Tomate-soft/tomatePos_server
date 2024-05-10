import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDailyRegisterDto {
  @IsNumber()
  employeeNumber: number;

  @IsNumber()
  pinPos: number;
  /*
  @IsBoolean()
  active: boolean;
  */
}
