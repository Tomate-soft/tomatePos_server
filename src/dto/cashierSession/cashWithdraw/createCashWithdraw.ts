import { IsDefined, IsOptional, IsString } from 'class-validator';

export class createCashWithdrawDto {
  @IsDefined()
  @IsString()
  quantity: string;

  @IsDefined()
  @IsString()
  operation: string;

  @IsDefined()
  @IsString()
  type: string;

  @IsDefined()
  @IsString()
  sessionId: string;
}
