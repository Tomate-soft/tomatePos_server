import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class createProfileDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  departament: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(1, 32)
  profileName: string;
}
