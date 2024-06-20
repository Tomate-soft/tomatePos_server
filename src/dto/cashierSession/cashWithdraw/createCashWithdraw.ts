import { IsOptional, IsString } from 'class-validator';

export class createCashWithdrawDto {
  @IsString()
  readonly amount: string;

  @IsOptional()
  @IsString()
  readonly concept: string;

  @IsString()
  readonly user: string;

  @IsString()
  readonly authUser: string;
}
