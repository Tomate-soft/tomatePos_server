import { IsString, IsDefined, IsArray, IsOptional } from 'class-validator';

export class CreateBillDto {
  @IsDefined()
  @IsString()
  user: string;

  @IsOptional()
  @IsArray()
  products?: [];

  @IsDefined()
  @IsString()
  table: string;
  /* validar la opcion de crear desde el inicio cuenta con notas */
  /*
  // @IsOptional()
  // @IsArray()
  // notes?: [];
  */

  /*
  @IsDefined()
  @IsString()
  devide: string;
  */
}
