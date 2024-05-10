import {
  IsDefined,
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class createModifierDto {
  @IsNotEmpty()
  @IsDefined()
  @Length(1, 35)
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(1, 35)
  @IsString()
  modifierName: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
