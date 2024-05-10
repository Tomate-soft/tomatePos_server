import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTillDto {
  @IsString()
  @IsOptional()
  @Length(1, 3)
  device?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  user?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  cash?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  debit?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  credit?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  trnsfer?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  rappi?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  didi?: string;

  @IsString()
  @IsOptional()
  @Length(1, 16)
  uber?: string;
}
