import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateDailyRegisterDto {
  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsString()
  firstTime?: string | null;

  @IsOptional()
  @IsString()
  secondTime?: string | null;

  @IsOptional()
  @IsString()
  thirdTime?: string | null;

  @IsOptional()
  @IsString()
  fourthTime?: string | null;
}
