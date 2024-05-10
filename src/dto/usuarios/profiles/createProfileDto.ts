import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class createProfileDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  departament: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Length(1, 25)
  profileName: string;
}
