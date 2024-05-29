import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscountDto } from 'src/dto/ventas/discounts/createDiscountDto';
import { UpdateDiscountDto } from 'src/dto/ventas/discounts/updateDiscountsDto';
import { Discount } from 'src/schemas/ventas/discounts.schema';
import { PRODUCTS_DISCOUNTS } from './cases';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { UpdateBillDto } from 'src/dto/ventas/bills/updateBill.Dto';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<Discount>,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
  ) {}

  async findAll() {
    return await this.discountModel.find();
  }

  async findOne(id: string) {
    return await this.discountModel.findById(id);
  }
  async create(payload: { accountApt: any; body: CreateDiscountDto }) {
    const session = await this.discountModel.startSession();
    session.startTransaction();
    try {
      switch (payload.body.discountType) {
        case PRODUCTS_DISCOUNTS:
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
          console.log(updatedBill);

          if (!updatedBill) {
            await session.abortTransaction();
            session.endSession();
            throw new Error('No se pudo completar');
          }
      }
      await session.commitTransaction();
      session.endSession();
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
