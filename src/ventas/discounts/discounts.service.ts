import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from 'src/dto/ventas/discounts/createDiscountDto';
import { UpdateDiscountDto } from 'src/dto/ventas/discounts/updateDiscountsDto';
import { Discount } from 'src/schemas/ventas/discounts.schema';
import {
  BILL_DISCOUNTS,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  NOTES_DISCOUNTS,
  PRODUCTS_DISCOUNTS,
} from './cases';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import {
  ENABLE_STATUS,
  FOR_PAYMENT_STATUS,
  FREE_STATUS,
} from 'src/libs/status.libs';
import { Table } from 'src/schemas/tables/tableSchema';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
  ) {}

  async findAll() {
    return await this.discountModel.find();
  }

  async findOne(id: string) {
    return await this.discountModel.findById(id);
  }
  async create(payload: { accountApt: any; body: CreateDiscountDto }) {
    console.log(payload);
    const session = await this.discountModel.startSession();
    session.startTransaction();
    try {
      switch (payload.body.discountType) {
        case COURTESY_APPLY_PRODUCTS:
        case PRODUCTS_DISCOUNTS:
          if (payload.accountApt.noteNumber) {
            const newDiscountNote = await this.discountModel.create(
              payload.body,
            );
            if (!newDiscountNote) {
              await session.abortTransaction();
              session.endSession();
              throw new Error('No se pudo completar');
            }
            const restoreDtaNote = {
              products: payload.accountApt.products,
              checkTotal: payload.accountApt.checkTotal,
            };
            const updatedNote = await this.noteModel.findByIdAndUpdate(
              payload.accountApt._id,
              restoreDtaNote,
              { new: true },
            );
            if (!updatedNote) {
              await session.abortTransaction();
              session.endSession();
              throw new Error('No se pudo completar');
            }
            const currentBillNote = await this.billsModel
              .findById(updatedNote.accountId)
              .populate({ path: 'notes' });
            if (!currentBillNote) {
              await session.abortTransaction();
              session.endSession();
              throw new Error('No se pudo encontrar la cuenta para actualizar');
            }
            const newBillTotal = currentBillNote.notes.reduce((a, b) => {
              return a + parseFloat(b.checkTotal);
            }, 0);

            const newProductsForBill = currentBillNote.notes.flatMap(
              (element) => element.products,
            );
            return updatedNote;
          }
          const newDiscount = await this.discountModel.create(payload.body);
          if (!newDiscount) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }
          const restoreDta = {
            products: payload.accountApt.products,
            checkTotal: payload.accountApt.checkTotal,
          };
          const updatedBill = await this.billsModel.findByIdAndUpdate(
            payload.accountApt._id,
            restoreDta,
            { new: true },
          );
          if (!updatedBill) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }
          return;

        case NOTES_DISCOUNTS:
          console.log(payload);
          const newDiscountNote = await this.discountModel.create(payload.body);

          if (!newDiscountNote) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }

          const updateNote = await this.noteModel.findByIdAndUpdate(
            newDiscountNote.accountId,
            { discount: newDiscountNote._id },
          );
          await session.commitTransaction();
          session.endSession();
          return newDiscountNote;

        case BILL_DISCOUNTS:
          const newDiscountBill = await this.discountModel.create(payload.body);

          if (!newDiscountBill) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }

          const updatedBillDiscount = await this.billsModel.findByIdAndUpdate(
            newDiscountBill.accountId,
            { discount: newDiscountBill._id },
          );
          await session.commitTransaction();
          session.endSession();
          return newDiscountBill;

        case COURTESY_APPLY_NOTES:
          console.log(payload);
          const newCourtesyNote = await this.discountModel.create(payload.body);

          if (!newCourtesyNote) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }

          const updateCourtesyNote = await this.noteModel.findByIdAndUpdate(
            newCourtesyNote.accountId,
            { discount: newCourtesyNote._id, status: FOR_PAYMENT_STATUS },
          );

          const courtesyBill = await this.billsModel
            .findById(newCourtesyNote.accountId)
            .populate({ path: 'notes' }); // encontramos la cuenta

          const enableNotes = courtesyBill.notes.filter(
            (note) =>
              note.status === ENABLE_STATUS ||
              note.status === FOR_PAYMENT_STATUS,
          );
          /////////////////////////////////////////////////////////////////
          if (enableNotes.length <= 0) {
            const tableUpdated = await this.tableModel.findByIdAndUpdate(
              courtesyBill.table,
              { status: FOR_PAYMENT_STATUS },
            );
          }

          /*  const currentPeriod: any =
            await this.operatingPeriodService.getCurrent(); */

          //
          await session.commitTransaction();
          session.endSession();
          return newDiscountNote;

        default:
          return;
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }
  async delete(id: string) {
    return await this.discountModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedDiscount: UpdateDiscountDto) {
    return await this.discountModel.findByIdAndUpdate(id, updatedDiscount, {
      new: true,
    });
  }
}
