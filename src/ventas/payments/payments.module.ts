import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/schemas/ventas/payment.schema';
import { BillsService } from '../bills/bills.service';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import { Table, TableSchema } from 'src/schemas/tables/tableSchema';
import {
  ToGoOrder,
  ToGoOrderSchema,
} from 'src/schemas/ventas/orders/toGoOrder.schema';
import { User, UserSchema } from 'src/schemas/users.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import { report } from 'process';
import { ReportsService } from 'src/reports/reports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: Table.name,
        schema: TableSchema,
      },
      {
        name: ToGoOrder.name,
        schema: ToGoOrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, BillsService, ReportsService],
})
export class PaymentsModule {}
