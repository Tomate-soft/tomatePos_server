import { IsOptional, IsString } from 'class-validator';

export class UpdateCancellationDto {
  @IsOptional()
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  cancellationBy: string;

  @IsOptional()
  @IsString()
  cancellationFor: string;

  @IsOptional()
  @IsString()
  cancellationReason: string;
}
