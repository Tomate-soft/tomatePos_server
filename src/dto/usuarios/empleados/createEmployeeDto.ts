import { IsDefined, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(1, 45)
  @IsDefined()
  code: string;

  @IsString()
  @Length(1, 45)
  @IsDefined()
  employeeName: string;

  @IsString()
  @Length(1, 45)
  @IsDefined()
  status: 'active' | 'inactive' | 'absent';

  @IsString()
  @Length(1, 45)
  @IsDefined()
  profile: string;

  @IsString()
  @Length(1, 45)
  @IsDefined()
  shift: string;
}
