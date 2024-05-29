import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { Payment, PaymentSchema } from 'src/schemas/ventas/payment.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
    ]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
