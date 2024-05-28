import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import { CreateBillDto } from 'src/dto/ventas/bills/createBill.Dto';
import { UpdateBillDto } from 'src/dto/ventas/bills/updateBill.Dto';
import { Bills, BillsDocument } from 'src/schemas/ventas/bills.schema';
import { BILL_TO_BILL } from './cases';
import { Console } from 'console';
import { Products } from 'src/schemas/catalogo/products.schema';

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bills.name) private billsModel: Model<BillsDocument>,
  ) {}

  async findAll() {
    try {
      return await this.billsModel
        .find()
        .populate({
          path: 'payment',
        })
        .populate({
          path: 'notes',
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.billsModel
        .findById(id)
        .populate({
          path: 'payment',
        })
        .populate({
          path: 'notes',
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createBill: CreateBillDto) {
    try {
      const lastBill = await this.billsModel
        .findOne({})
        .sort({ createdAt: -1 })
        .exec();

      const nextBillCode = lastBill
        ? this.getNextBillCode(lastBill.billCode)
        : 1;

      const billToCreate = new this.billsModel({
        ...createBill,
        billCode: nextBillCode,
      });

      await billToCreate.save();

      return billToCreate;
    } catch (error) {
      throw error;
    }
  }

  private getNextBillCode(lastBillCode: number): number {
    return lastBillCode + 1;
  }

  /*
  async create(createBill: CreateBillDto) {
    const session = await this.billsModel.startSession();
    session.startTransaction();

    try {
      // Obtener el valor actual del contador y formatear el billCode
      const billCodeCounter = await this.getNextBillCodeCounter(session);
      const formattedBillCode = this.formatBillCode(billCodeCounter);

      // Incrementar el contador en la base de datos
      await this.incrementBillCodeCounter(session);

      // Crear la nueva factura con el billCode formateado
      const billToCreate = new this.billsModel({
        ...createBill,
        billCode: formattedBillCode,
      });

      await billToCreate.save({ session });

      await session.commitTransaction();
      session.endSession();

      return billToCreate;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  }
 */
  async delete(id: string) {
    return await this.billsModel.findByIdAndDelete(id);
  }

  async update(id: string, updatedBill: UpdateBillDto) {
    return await this.billsModel.findByIdAndUpdate(id, updatedBill, {
      new: true,
    });
  }

  async transferProducts(body: any) {
    const session = await this.billsModel.startSession();
    session.startTransaction();
    try {
      switch (body.case) {
        case BILL_TO_BILL:
          // hacemos los cambios en la cuenta principal
          const newProducts = body.receivingBill.products; // ✅
          const checkTotalNew = newProducts
            .reduce(
              (a, b) =>
                a +
                parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
              0,
            )
            .toFixed(2)
            .toString();

          const updateBill = {
            products: newProducts,
            checkTotal: checkTotalNew,
          };

          const currentReceivingBill = await this.billsModel.findByIdAndUpdate(
            body.receivingBill._id,
            updateBill,
          );
          // Hasta uya actualizamos la cuenta que recibe
          // Ahora vamos a actualizar la cuenta que envia
          const newSendBillProducts = body.sendBill.products;
          console.log('checamos los productos de la cuenta que esta enviando ');
          console.log(newSendBillProducts);
          const sendBillcheckTotalNew = newSendBillProducts
            .reduce(
              (a, b) =>
                a +
                parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
              0,
            )
            .toFixed(2)
            .toString();

          const updateSendBill = {
            products: newSendBillProducts,
            checkTotal: sendBillcheckTotalNew,
          };
          const currentSendBill = await this.billsModel.findByIdAndUpdate(
            body.sendBill._id,
            updateSendBill,
          );

          if (!currentReceivingBill) {
            throw new NotFoundException(`No se encuentra la cuenta, error`);
          }
          await session.commitTransaction();
          session.endSession();
        // actuyalizamos el nuevo total
        // los productos
        default:
          throw new Error('No existe el caso');
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
    }
  }
  /*

  async getNextBillCodeCounter(session?: ClientSession): Promise<number> {
    const result = await this.billsModel.findOneAndUpdate(
      {},
      { $inc: { billCodeCounter: 1 } },
      { new: true, upsert: true, select: 'billCodeCounter', session },
    );

    return result ? result.billCodeCounter : 1;
  }

  async incrementBillCodeCounter(session?: ClientSession): Promise<void> {
    await this.billsModel.updateOne(
      {},
      { $inc: { billCodeCounter: 1 } },
      { session },
    );
  }

  private formatBillCode(counter: number): string {
    // Formatear el contador como "001"
    return counter.toString().padStart(3, '0');
  }
  */
}
