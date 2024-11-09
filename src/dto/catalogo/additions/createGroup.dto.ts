import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateAdditionDto {
  @IsString()
  @IsNotEmpty()
  groupName: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  modifiers?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  dishes?: string[];
}
