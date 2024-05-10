import { IsOptional, IsString, Length } from 'class-validator';

export class updateProfileDto {
  @IsString()
  @IsOptional()
  departament?: string;

  @IsOptional()
  code?: number;

  @IsString()
  @IsString()
  @IsOptional()
  @Length(1, 25)
  profileName?: string;
}
