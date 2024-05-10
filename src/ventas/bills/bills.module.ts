import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema, Bills } from 'src/schemas/ventas/bills.schema';
import { Payment, PaymentSchema } from 'src/schemas/ventas/payment.schema';
import { NoteSchema, Notes } from 'src/schemas/ventas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bills.name,
        schema: BillSchema,
      },
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: Notes.name,
        schema: NoteSchema,
      },
    ]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
