import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @Length(1, 45)
  @IsOptional()
  code?: string;

  @IsString()
  @Length(1, 45)
  @IsOptional()
  employeeName?: string;

  @IsString()
  @Length(1, 45)
  @IsOptional()
  status?: 'active' | 'inactive' | 'absent';

  @IsString()
  @Length(1, 45)
  @IsOptional()
  profile?: string;

  @IsString()
  @IsOptional()
  @Length(1, 45)
  shift?: string;
}
