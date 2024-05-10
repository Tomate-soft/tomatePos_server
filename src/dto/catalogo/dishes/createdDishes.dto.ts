import {
  IsString,
  IsDefined,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class createDishesDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 35)
  category: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 16)
  code: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(1, 35)
  dishesName: string;

  @IsNumber()
  @IsOptional()
  priceInSite?: number;

  @IsNumber()
  @IsOptional()
  priceToGo?: number;

  @IsNumber()
  @IsOptional()
  priceCallOrder?: number;

  @IsNumber()
  @IsOptional()
  priceDelivery?: number;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  status?: 'disabled' | 'enabled';
}
