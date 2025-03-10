import { IsDefined, IsOptional } from 'class-validator';

export class CreateReopenDto {
  @IsDefined()
  accountId: string;

  @IsOptional()
  noteAccountId: string;

  @IsDefined()
  userId: string;
}
