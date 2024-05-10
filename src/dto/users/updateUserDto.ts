import { Transform } from 'class-transformer';
import {
  Length,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  @Length(2, 35)
  name?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(2, 45)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  active?: boolean;

  @IsOptional()
  //@IsNumber()
  //@Length(4, 4)
  employeeNumber?: number;

  @IsOptional()
  //@IsNotEmpty()
  //@Length(4, 4)
  pinPos?: number;

  @IsOptional()
  shift?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 35)
  entryDate?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  samples?: string[];

  @IsOptional()
  tables?: string[];

  @IsOptional()
  dailyRegister: string;

  @IsOptional()
  cashierSession: string;
}
