import { IsString, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class UpdateAdditionDto {
  @IsString()
  @IsOptional()
  groupName?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  modifiers?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  dishes?: string[];
}
