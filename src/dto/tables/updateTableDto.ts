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
  @IsOptional()
  assigned?: boolean;
  @IsOptional()
  user?: string;
  @IsOptional()
  zone?: string;
  @IsOptional()
  active?: boolean;
  @IsOptional()
  availability?: boolean;
  @IsOptional()
  joinedTables?: string[];
}
