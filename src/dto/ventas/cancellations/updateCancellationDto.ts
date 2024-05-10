import { IsOptional, IsString } from 'class-validator';

export class UpdateCancellationDto {
  @IsOptional()
  @IsString()
  checkCode?: string;

  @IsOptional()
  @IsString()
  sellType?: string; // este sera un enum

  @IsOptional()
  @IsString()
  cancellationMount?: string;

  @IsOptional()
  @IsString()
  cancellationBy?: string;

  @IsOptional()
  @IsString()
  cancellationFor?: string;

  @IsOptional()
  @IsString()
  cancellationReason?: string;

  @IsOptional()
  @IsString()
  cancellationDate?: string;
}
