import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCancellationDto } from 'src/dto/ventas/cancellations/createCancellationDto';
import { UpdateCancellationDto } from 'src/dto/ventas/cancellations/updateCancellationDto';
import { CANCELLED_STATUS, FREE_STATUS } from 'src/libs/status.libs';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Cancellations } from 'src/schemas/ventas/cancellations.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { Product } from 'src/schemas/ventas/product.schema';

@Injectable()
export class CancellationsService {
  constructor(
    @InjectModel(Cancellations.name)
    private cancellationModel: Model<Cancellations>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private notesModel: Model<Notes>,
    @InjectModel(Product.name) private productsModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.cancellationModel.find();
  }

  async findOne(id: string) {
    return await this.cancellationModel.findById(id);
  }

  async create(createdCancellation: CreateCancellationDto) {
    const session = await this.cancellationModel.startSession();
    session.startTransaction();
    try {
      const newCancellation = new this.cancellationModel(createdCancellation);
      await newCancellation.save();

      if (
        createdCancellation.accountId &&
        !createdCancellation.noteId &&
        !createdCancellation.productId
      ) {
        const currentBill = await this.billsModel.findByIdAndUpdate(
          createdCancellation.accountId,
          { status: CANCELLED_STATUS },
          { new: true },
        );
        const updateTabl = await this.tableModel.findByIdAndUpdate(
          currentBill.table,
          { status: FREE_STATUS, bill: [] },
          { new: true },
        );
      }

      if (createdCancellation.noteId && !createdCancellation.productId) {
        const updateNote = await this.notesModel.findByIdAndUpdate(
          createdCancellation.noteId,
          { status: CANCELLED_STATUS },
        );

        const currentBill = await this.billsModel
          .findById(createdCancellation.accountId)
          .populate({ path: 'notes' });
        const enableNotes = currentBill.notes.filter(
          (element) => element.status !== CANCELLED_STATUS,
        );

        const newTotal = (
          parseFloat(currentBill.checkTotal) - parseFloat(updateNote.checkTotal)
        ).toString();

        const updateBill = await this.billsModel
          .findByIdAndUpdate(
            currentBill._id,
            { notes: enableNotes, checkTotal: newTotal },
            { new: true },
          )
          .populate({ path: 'notes' });

        if (updateBill.notes.length <= 0) {
          const updateTabl = await this.tableModel.findByIdAndUpdate(
            currentBill.table,
            { status: FREE_STATUS, bill: [] },
            { new: true },
          );

          const updateBillStatus = await this.billsModel.findByIdAndUpdate(
            updateBill._id,
            { status: CANCELLED_STATUS },
            { new: true },
          );
        }
      }
      await session.commitTransaction();
      session.endSession();
      return newCancellation;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new NotFoundException(`No se pudo completar. ${error}`);
    }
  }

  async delete(id: string) {
    return this.cancellationModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedCancellation: UpdateCancellationDto) {
    return await this.cancellationModel.findByIdAndUpdate(
      id,
      updatedCancellation,
      { new: true },
    );
  }
}
