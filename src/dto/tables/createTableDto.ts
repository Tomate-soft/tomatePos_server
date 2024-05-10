import { IsString } from 'class-validator';
import { Table } from 'src/schemas/tables/tableSchema';

export class CreateTableDto {
  @IsString()
  tableNum?: string;
  @IsString()
  server?: string;
  @IsString()
  status?: string;
  bill?: [];
}
