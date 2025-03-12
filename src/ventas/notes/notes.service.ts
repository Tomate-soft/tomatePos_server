import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createNoteDto } from 'src/dto/ventas/notes/createNoteDto';
import { updateNoteDto } from 'src/dto/ventas/notes/updateNoteDto';
import { ENABLE_STATUS } from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { calculateBillTotal } from 'src/utils/business/CalculateTotals';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(Bills.name) private BillsModel: Model<Bills>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    private readonly operatingPeriodService: OperatingPeriodService,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(ToGoOrder.name) private toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
  ) {}

  async findAll() {
    return await this.noteModel.find().populate({ path: 'discount' });
  }

  async findOne(id: string) {
    return await this.noteModel.findById(id);
  }

  async create(createNote: createNoteDto) {
    const lastNote = await this.noteModel
      .findOne({ accountId: createNote.accountId })
      .sort({ createdAt: -1 })
      .exec();
    const nextNoteCode = lastNote
      ? this.getNextNoteCode(lastNote.noteNumber)
      : 1;

    const noteToCreate = new this.noteModel({
      ...createNote,
      noteNumber: nextNoteCode,
    });

    await noteToCreate.save();
    return noteToCreate;
  }

  async delete(id: string) {
    return await this.noteModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedNote: updateNoteDto, accountId?: string) {
    if (accountId && accountId != null) {
      if (updatedNote.status) {
        const session = await this.noteModel.startSession();
        session.startTransaction();
        try {
          // Actualizar note
          const upNote = await this.noteModel.findByIdAndUpdate(
            id,
            updatedNote,
            { new: true /* session */ },
          );
          const searchAccount = await this.BillsModel.findById(
            accountId,
          ).populate({ path: 'notes' });
          if (searchAccount.cashierSession) {
            // aca haremos un proceso para cuando la cuenta ya tiene un cajero asignado
            const pendingNotes = searchAccount.notes.filter(
              (element) => element.status === ENABLE_STATUS,
            );

            if (pendingNotes.length === 0) {
              // aqui cambiamos el status de la mesa
              const table = await this.tableModel.findByIdAndUpdate(
                searchAccount.table,
                { status: 'forPayment' },
              );
            }
            await session.commitTransaction();
            session.endSession();
            return upNote;
          }
          // ocupo clavar el id de la cuenta en la cashier session
          const currentPeriod: any =
            await this.operatingPeriodService.getCurrent();
          const randomIndex = Math.floor(
            Math.random() * currentPeriod[0].sellProcess.length,
          );
          const cashierSessionId =
            currentPeriod[0].sellProcess[randomIndex]._id;
          const selectSession =
            await this.cashierSessionModel.findById(cashierSessionId);
          const updatedSession =
            await this.cashierSessionModel.findByIdAndUpdate(cashierSessionId, {
              bills: [...selectSession.bills, accountId],
            });
          // Actualizar bill
          const updateBill = await this.BillsModel.findByIdAndUpdate(
            accountId,
            { cashierSession: cashierSessionId },
            { new: true },
          );
          const res = { updNote: upNote, updBill: updateBill };
          await session.commitTransaction();
          session.endSession();
          return res;
        } catch (error) {
          await session.abortTransaction();
          session.endSession();
          throw error;
        }
      }
      const billCurrent = await this.BillsModel.findById(accountId);
      if (billCurrent && billCurrent.notes.length > 0) {
        //
        const upNote = await this.noteModel.findByIdAndUpdate(id, updatedNote, {
          new: true,
        }); // ACTUALIZAMOS L ANOTA
        if (upNote) {
          const refreshedBill = await this.BillsModel.findById(
            accountId,
          ).populate({ path: 'notes' });

          const sumProducts = [...refreshedBill.notes].flatMap(
            (nota) => nota.products,
          );

          const newTotal = calculateBillTotal(sumProducts);

          const refreshData = { checkTotal: newTotal, products: sumProducts };

          const refreshTotalInBill = await this.BillsModel.findByIdAndUpdate(
            accountId,
            refreshData,
          );
          return refreshTotalInBill;
        }
      }
    }
    return await this.noteModel.findByIdAndUpdate(id, updatedNote, {
      new: true,
    });
  }
  private getNextNoteCode(lastBillCode: number): number {
    return lastBillCode + 1;
  }
}
