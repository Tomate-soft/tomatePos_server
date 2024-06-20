import { IsOptional } from 'class-validator';

export class updateCashWithdrawDto {
  @IsOptional()
  readonly amount: string;

  @IsOptional()
  readonly concept: string;

  @IsOptional()
  readonly user: string;

  @IsOptional()
  readonly authUser: string;
}
