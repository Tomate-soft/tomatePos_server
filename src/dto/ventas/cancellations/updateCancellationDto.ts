import { IsOptional, IsString } from 'class-validator';

export class UpdateCancellationDto {
  @IsOptional()
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  product?: {};

  @IsOptional()
  @IsString()
  cancellationBy: string;

  @IsOptional()
  @IsString()
  cancellationFor: string;

  @IsOptional()
  @IsString()
  cancellationReason: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  cancelledAmount: string;
}
