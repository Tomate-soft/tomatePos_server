import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReopenDto } from 'src/dto/reopen/createReopen';
import { ENABLE_STATUS } from 'src/libs/status.libs';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { Reopen } from 'src/schemas/reopen/reopen.schema';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';

@Injectable()
export class ReopenService {
  constructor(
    @InjectModel(Reopen.name) private reopenModel: Model<Reopen>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private noteModel: Model<Notes>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
  ) {}

  async findAll() {
    return await this.reopenModel
      .find()
      .populate({
        path: 'accountId',
      })
      .populate({
        path: 'userId',
      });
  }

  async findOne(id: string) {
    return await this.reopenModel.findById(id);
  }

  async create(payload: CreateReopenDto) {
    const session = await this.reopenModel.startSession();
    await session.withTransaction(async () => {
      const reopen = new this.reopenModel(payload);
      await reopen.save();

      // cambiar el status de la cuenta de nuevo a enable
      const currentBill = await this.billsModel.findByIdAndUpdate(
        payload.accountId,
        { status: ENABLE_STATUS },
      );

      const currentTable = await this.tableModel.findByIdAndUpdate(
        currentBill.table,
        { status: ENABLE_STATUS },
      );

      // cambiar el status de la mesa de nuevo a enable
      // buscar la cuenta en la session del cajero y sacarla de la session

      await session.commitTransaction();
      session.endSession();
      return reopen;
    });
  }

  async createReopenNote(payload: CreateReopenDto) {
    console.log(payload);
    const session = await this.reopenModel.startSession();
    await session.withTransaction(async () => {
      const reopen = new this.reopenModel(payload);
      await reopen.save();

      const currentNote = await this.noteModel.findByIdAndUpdate(
        payload.noteAccountId,
        { status: ENABLE_STATUS },
      );

      const currentBill = await this.billsModel.findByIdAndUpdate(
        payload.accountId,
        { status: ENABLE_STATUS },
      );

      const currentTable = await this.tableModel.findByIdAndUpdate(
        currentBill.table,
        { status: ENABLE_STATUS },
      );
      await session.commitTransaction();
      session.endSession();
      return reopen;
    });
  }

  async update(id: string, updatedReopen: CreateReopenDto) {
    return await this.reopenModel.findByIdAndUpdate(id, updatedReopen, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.reopenModel.findByIdAndDelete(id);
  }
}
