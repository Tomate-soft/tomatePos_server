import {
  IsDefined,
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class updateModifierDto {
  @IsNotEmpty()
  @IsDefined()
  @Length(1, 35)
  @IsString()
  @IsOptional()
  category?: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(1, 35)
  @IsString()
  @IsOptional()
  modifierName?: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
