import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCancellationDto } from 'src/dto/ventas/cancellations/createCancellationDto';
import { UpdateCancellationDto } from 'src/dto/ventas/cancellations/updateCancellationDto';
import {
  CANCELLED_STATUS,
  ENABLE_STATUS,
  FINISHED_STATUS,
  FOR_PAYMENT_STATUS,
  FREE_STATUS,
} from 'src/libs/status.libs';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { Table } from 'src/schemas/tables/tableSchema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { Cancellations } from 'src/schemas/ventas/cancellations.schema';
import { Notes } from 'src/schemas/ventas/notes.schema';
import { Product } from 'src/schemas/ventas/product.schema';
import { calculateBillTotal } from 'src/utils/business/CalculateTotals';

@Injectable()
export class CancellationsService {
  constructor(
    @InjectModel(Cancellations.name)
    private cancellationModel: Model<Cancellations>,
    @InjectModel(Table.name) private tableModel: Model<Table>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(Notes.name) private notesModel: Model<Notes>,
    @InjectModel(Product.name) private productsModel: Model<Product>,
    @Inject(forwardRef(() => OperatingPeriodService))
    private readonly operatingPeriodService: OperatingPeriodService,
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
        // const updateTable = await this.tableModel.findByIdAndUpdate(
        //   currentBill.table,
        //   { status: FREE_STATUS, bill: [] },
        //   { new: true },
        // );

        const currentBill = await this.billsModel
          .findById(createdCancellation.accountId)
          .populate({ path: 'notes' });

        const enableNotes = currentBill.notes.filter(
          (element) =>
            element.status === ENABLE_STATUS ||
            element.status === FOR_PAYMENT_STATUS,
        );

        const finishedNotes = currentBill.notes.filter(
          (element) => element.status === FINISHED_STATUS,
        );

        const newTotal = (
          parseFloat(calculateBillTotal(currentBill?.products)) -
          parseFloat(calculateBillTotal(updateNote?.products))
        ).toString();

        const updateBill = await this.billsModel
          .findByIdAndUpdate(
            currentBill._id,
            { checkTotal: newTotal },
            { new: true },
          )
          .populate({ path: 'notes' });

        const newStatus =
          enableNotes?.length <= 0 && finishedNotes.length <= 0
            ? CANCELLED_STATUS
            : enableNotes?.length >= 1
              ? ENABLE_STATUS
              : FINISHED_STATUS;

        const updateBillStatus = await this.billsModel.findByIdAndUpdate(
          updateBill._id,
          { status: newStatus },
          { new: true },
        );

        const onlyForPayment = enableNotes.filter(
          (element) => element.status === FOR_PAYMENT_STATUS,
        );

        // Aqui la situacion es que pueden ser los siguientes casos
        // Mando una nota a cancelar, pueden haber mas notas habilitadas  ---> Aca mesa deberia seguir estando habilitada
        // Mando una nota a cancelar, sin mas notas habilitadas pero otras que esten por pagar ----> Aca la mesa deberia estar por pagar
        // Mando una nota a cancelar, puede que no haya mas notas habilitadas ni pór págar, y que las demas esten ya pagadas ----> La mesa deberia estar libre
        // Mando una nota a cancelar, puede que no haya mas notas habilitadas ni pór págar, y que las demas esten ya canceladas  -----> La mesa deberia estar libre
        // Mando una nota a cancelar, puede que no haya mas notas habilitadas ni pór págar, que haya algunas pagadas y otras canceladas ----> La mesa deberia estar libre
        const newTableStatus =
          enableNotes?.length > 0 &&
          !enableNotes.some((element) => element.status === FOR_PAYMENT_STATUS)
            ? ENABLE_STATUS
            : enableNotes?.length === 1 && onlyForPayment.length > 0
              ? FOR_PAYMENT_STATUS
              : FREE_STATUS;
        console.log(
          enableNotes?.length > 1 &&
            !enableNotes.some(
              (element) => element.status === FOR_PAYMENT_STATUS,
            ),
        );
        console.log(enableNotes?.length === 2 && onlyForPayment.length > 0);
        console.log(newTableStatus);
        console.log(onlyForPayment);
        console.log(onlyForPayment.length);
        enableNotes.forEach((element) => {
          console.log(element);
        });

        // Cuando vamos a actualizar la mesa?
        if (enableNotes.length < 1) {
          const updateTabl = await this.tableModel.findByIdAndUpdate(
            currentBill.table,
            { status: newTableStatus, bill: [] },
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
        const checkTotalNew = calculateBillTotal(body.aptAccount.products);
        const updateBill = await this.billsModel.findByIdAndUpdate(
          body.body.accountId,
          { products: body.aptAccount.products, checkTotal: checkTotalNew },
        );

        await session.commitTransaction();
        session.endSession();
        return newCancelproduct;
      }
      const checkTotalNewNote = calculateBillTotal(body.aptAccount.products);

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

  async findCurrent(id?: string) {
    const session = await this.cancellationModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = id
        ? await this.operatingPeriodService.getCurrent(id)
        : await this.operatingPeriodService.getCurrent();

      const currentPeriodId = currentPeriod[0]._id;

      const currentCancellations = await this.cancellationModel.find({
        operatingPeriod: currentPeriodId,
      });

      if (!currentCancellations) {
        throw new NotFoundException('No se encontraron cancelaciones');
      }
      await session.commitTransaction();
      session.endSession();
      return currentCancellations;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
