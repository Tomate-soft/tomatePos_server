import { IsOptional, IsString } from 'class-validator';

export class UpdateTableDto {
  @IsString()
  @IsOptional()
  tableNum?: string;
  @IsString()
  @IsOptional()
  server?: string;
  @IsString()
  @IsOptional()
  status?: string;
  @IsOptional()
  bill?: string[];
}
