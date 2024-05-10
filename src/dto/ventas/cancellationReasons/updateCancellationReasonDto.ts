import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateCancellationReasonDto {
  @IsOptional()
  @IsString()
  @Length(1, 2)
  keyReason?: string;

  @IsOptional()
  @IsString()
  @Length(1, 35)
  reasonName?: string;

  @IsOptional()
  substraction?: boolean;
}
