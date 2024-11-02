import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCancellationDto } from 'src/dto/ventas/cancellations/createCancellationDto';
import { UpdateCancellationDto } from 'src/dto/ventas/cancellations/updateCancellationDto';
import { CANCELLED_STATUS, FREE_STATUS } from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
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
    private operatingPeriodService: OperatingPeriodService,
  ) {}

  async findAll() {
    return await this.cancellationModel
      .find()
      .populate({
        path: 'accountId',
      })
      .populate({
        path: 'cancellationBy',
      })
      .populate({
        path: 'noteId',
      })
      .lean();
  }

  async findOne(id: string) {
    return await this.cancellationModel.findById(id);
  }

  async create(createdCancellation: CreateCancellationDto) {
    const session = await this.cancellationModel.startSession();
    await session.withTransaction(async () => {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const periodId = currentPeriod[0].id;
      const isBillCancel =
        createdCancellation.cancelType === 'BILL_CANCELLATION';

      const isNotesCancel =
        createdCancellation.cancelType === 'NOTES_CANCELLATION';

      const newCancellation = new this.cancellationModel({
        ...createdCancellation,
        operatingPeriod: periodId,
      });
      await newCancellation.save();

      if (isBillCancel) {
        const currentBill = await this.billsModel.findByIdAndUpdate(
          createdCancellation.accountId.toString(),
          { status: CANCELLED_STATUS },
          { new: true },
        );

        const updateTable = await this.tableModel.findByIdAndUpdate(
          currentBill.table,
          { status: FREE_STATUS, bill: [] },
          { new: true },
        );

        await session.commitTransaction();
        await session.endSession();
        return newCancellation;
      }

      if (isNotesCancel) {
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
            { checkTotal: newTotal },
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
        await session.commitTransaction();
        await session.endSession();
        return newCancellation;
      }
    });
  }

  async cancelProducts(body: { aptAccount: any; body: CreateCancellationDto }) {
    const session = await this.cancellationModel.startSession();
    const cancellation = await session.withTransaction(async (session) => {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      const periodId = currentPeriod[0].id;

      const newCancelproduct = new this.cancellationModel({
        ...body.body,
        operatingPeriod: periodId,
        cancelType: 'PRODUCTS_CANCELLATION',
      });
      await newCancelproduct.save();

      if (newCancelproduct && !body.body.noteId) {
        // aca la cuenta sin notas
        const checkTotalNew = body.aptAccount.products
          .reduce(
            (a, b) =>
              a +
              parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
            0,
          )
          .toFixed(2)
          .toString();
        const updateBill = await this.billsModel.findByIdAndUpdate(
          body.body.accountId,
          { products: body.aptAccount.products, checkTotal: checkTotalNew },
        );

        await session.commitTransaction();
        session.endSession();
        return newCancelproduct;
      }
      const checkTotalNewNote = body.aptAccount.products
        .reduce(
          (a, b) =>
            a + parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
          0,
        )
        .toFixed(2)
        .toString();
      // aca es el precio de la nota
      const updateNote = await this.notesModel.findByIdAndUpdate(
        body.body.noteId,
        { products: body.aptAccount.products, checkTotal: checkTotalNewNote },
      );
      // toca actualizar la cuenta despues de modificar la nota:
      const currentBill = await this.billsModel
        .findById(body.body.accountId)
        .populate({ path: 'notes' });
      const newTotalBill = currentBill.notes
        .reduce((a, b) => a + parseFloat(b.checkTotal), 0)
        .toString();
      const updateBillWithNote = await this.billsModel.findByIdAndUpdate(
        currentBill._id,
        {
          products: body.aptAccount.products,
          checkTotal: newTotalBill,
        },
      );
      await session.commitTransaction();
      session.endSession();
      return newCancelproduct;
    });
    console.log('cancelacion de productos papirrin');
    console.log(cancellation);

    return cancellation;
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
