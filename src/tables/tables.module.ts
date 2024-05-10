import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
