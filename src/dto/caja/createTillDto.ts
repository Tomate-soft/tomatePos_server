import { IsDefined, IsString, Length } from 'class-validator';

export class CreateTillDto {
  @IsString()
  @IsDefined()
  @Length(1, 3)
  device: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  user: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  cash: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  debit: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  credit: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  trnsfer: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  rappi: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  didi: string;

  @IsString()
  @IsDefined()
  @Length(1, 16)
  uber: string;
}
