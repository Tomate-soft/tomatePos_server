import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateCancellationDto {
  @IsDefined()
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsDefined()
  @IsString()
  cancellationBy: string;

  @IsDefined()
  @IsString()
  cancellationFor: string;

  @IsDefined()
  @IsString()
  cancellationReason: string;
}
