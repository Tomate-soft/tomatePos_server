import { IsDefined } from 'class-validator';

export class CreateReopenDto {
  @IsDefined()
  accountId: string;

  @IsDefined()
  userId: string;
}
