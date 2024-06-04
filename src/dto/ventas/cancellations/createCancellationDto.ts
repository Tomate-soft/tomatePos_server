import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateCancellationDto {
  @IsDefined()
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  noteId?: string;

  @IsOptional()
  product?: {};

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
