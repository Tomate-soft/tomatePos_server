import { IsOptional, IsString, Length } from 'class-validator';

export class updateDepartamentDto {
  @IsOptional()
  @Length(1, 2)
  code?: number;

  @IsString()
  @IsOptional()
  @Length(1, 25)
  departamentName?: string;
}
