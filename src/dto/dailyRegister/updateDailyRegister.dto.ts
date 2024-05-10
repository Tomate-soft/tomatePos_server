import { IsBoolean, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateDailyRegisterDto {
  @IsOptional()
  @IsNumber()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  timeStart?: string;

  @IsOptional()
  @IsString()
  timeEnd?: string;
}
