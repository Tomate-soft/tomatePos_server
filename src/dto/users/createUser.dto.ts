import { Transform } from 'class-transformer';
import {
  Length,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @Length(2, 35)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @Length(2, 45)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsOptional()
  active?: boolean;

  @IsOptional()
  //@IsInt()
  // @Length(4, 4, { message: 'Debe contener exactamente 4 dígitos' })
  employeeNumber?: number;

  @IsNotEmpty()
  //@IsInt()
  //@Length(4, 4, { message: 'Debe contener exactamente 4 dígitos' })
  pinPos: number;

  shift: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 35)
  entryDate: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  samples?: string[];

  @IsOptional()
  dailyRegister?: string;
}
