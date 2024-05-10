import { IsDefined, IsString } from 'class-validator';

export class CreateCancellationDto {
  @IsDefined()
  @IsString()
  checkCode: string;

  @IsDefined()
  @IsString()
  sellType: string; // este sera un enum

  @IsDefined()
  @IsString()
  cancellationMount: string;

  @IsDefined()
  @IsString()
  cancellationBy: string;

  @IsDefined()
  @IsString()
  cancellationFor: string;

  @IsDefined()
  @IsString()
  cancellationReason: string;

  @IsString()
  cancellationDate: string;
}
