import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateDailyRegisterDto {
  @IsNumber()
  employeeNumber: number;

  @IsNumber()
  pinPos: number;

  @IsString()
  @IsDefined()
  registerInput: string;

  /*
  @IsBoolean()
  active: boolean;
  */
}
