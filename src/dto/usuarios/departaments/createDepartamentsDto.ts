import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class createDepartamentDto {
  @IsOptional()
  @Length(1, 2)
  code?: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(1, 25)
  departamentName: string;
}
