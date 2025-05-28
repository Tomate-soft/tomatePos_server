import { IsOptional, IsString, Length } from 'class-validator';

export class updateProfileDto {
  @IsOptional()
  departament?: string[];

  @IsOptional()
  code?: number;

  @IsString()
  @IsOptional()
  @Length(1, 32)
  profileName?: string;

  @IsOptional()
  role?: string;
}
