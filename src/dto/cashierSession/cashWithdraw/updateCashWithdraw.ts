import { IsOptional } from 'class-validator';

export class updateCashWithdrawDto {
  @IsOptional()
  quantity: string;

  @IsOptional()
  operation: string;

  @IsOptional()
  type: string;

  @IsOptional()
  sessionId: string;
}
