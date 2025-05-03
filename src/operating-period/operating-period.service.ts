import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CANCELLED_STATUS, FINISHED_STATUS } from 'src/libs/status.libs';
import { Branch } from 'src/schemas/business/branchSchema';
import {
  OperatingPeriod,
  State,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { ProcessService } from 'src/process/process.service';
import { BillsService } from 'src/ventas/bills/bills.service';
import { SourcePeriod } from 'src/schemas/SourcePeriod/sourcePeriod.schema';
import { branchId } from 'src/variablesProvisionales';
import { DiscountsService } from 'src/ventas/discounts/discounts.service';
import { CancellationsService } from 'src/ventas/cancellations/cancellations.service';

@Injectable()
export class OperatingPeriodService {
  constructor(
    @InjectModel(SourcePeriod.name)
    private sourcePeriodModel: Model<SourcePeriod>,
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @Inject(forwardRef(() => ProcessService))
    private readonly processService: ProcessService,
    @Inject(forwardRef(() => BillsService))
    private readonly billsService: BillsService,
    @Inject(forwardRef(() => DiscountsService))
    private readonly discountsService: DiscountsService,
    @Inject(forwardRef(() => CancellationsService))
    private readonly cancellationService: CancellationsService,
  ) {}

  async findAll() {
    return this.operatingPeriodModel.find().populate({
      path: 'approvedBy',
    });
  }

  async getCurrent(id?: string) {
    const session = await this.branchModel.startSession();
    session.startTransaction();

    try {
      const branchId = '66bd36e5a107f6584ef54dca';
      const branch = await this.branchModel
        .findById(branchId)
        .populate({ path: 'operatingPeriod' });
      if (!branch) {
        throw new Error('No se encontro la branch');
      }
      const periodId = id ?? branch.operatingPeriod;
      const operatingPeriod = await this.operatingPeriodModel
        .findById(periodId)
        .populate({
          path: 'sellProcess',
          populate: [
            {
              path: 'bills',
              populate: { path: 'notes', populate: { path: 'discount' } },
            },
            { path: 'bills', populate: { path: 'payment' } },
            { path: 'bills', populate: { path: 'discount' } },
          ],
        });

      console.log(operatingPeriod);
      await session.commitTransaction();
      session.endSession();
      return [operatingPeriod];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getTotalSellsService() {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const doc = await this.operatingPeriodModel
      .find({
        createdAt: { $gte: startDate, $lt: endDate },
      })
      .populate({
        path: 'sellProcess',
        populate: [
          { path: 'bills', populate: { path: 'notes' } },
          { path: 'bills', populate: { path: 'payment' } },
          { path: 'togoorders', populate: { path: 'payment' } },
        ],
      });

    const onSiteOrders = doc.flatMap((docItem) =>
      docItem.sellProcess.flatMap((sellProcess) => sellProcess.bills),
    );

    const toGoOrders = doc.flatMap((docItem) =>
      docItem.sellProcess.flatMap((sellProcess) => sellProcess.togoorders),
    );

    const totalOrders = [...onSiteOrders, ...toGoOrders];

    const completeOrders = totalOrders.filter(
      (order) => order.status === FINISHED_STATUS,
    );

    return completeOrders;
  }

  async closePeriod(id: string = '') {
    // TODO: Pasar toda la informacion de cierre el reporte de final del periodo operativo;
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      let periodId = id;
      let currentDate = new Date();
      if (!id) {
        const currentPeriod = await this.getCurrent();
        periodId = currentPeriod[0]._id.toString();
        currentDate = new Date(currentPeriod[0].createdAt);
      }
      // aca traemos el total de ventas
      const totalSellsResponse =
        await this.processService.totalPeriodSells(periodId);
      const totalSells = totalSellsResponse.totalSellAmount;

      // todo: Total de ventas del tipo de venta restaurante CANTIDAD
      // usar el findCurrentBysSelltype del  billService
      const totalRestaurantSellsResponse =
        await this.processService.especifTotalPeriodSells(
          periodId,
          'ON_SITE_ORDER',
        );
      const totalRestaurantSellsCount =
        totalRestaurantSellsResponse.totalSellCount;

      // todo: Total de ventas del tipo de venta restaurante MONTO EN DINERO
      const totalRestaurantSellsAmount =
        totalRestaurantSellsResponse.totalSellAmount;

      // todo: Total de ventas del tipo de venta to Go CANTIDAD
      const totalToGoSellsCountResponse =
        await this.processService.especifTotalPeriodSells(
          periodId,
          'TOGO_ORDER',
        );

      const totalToGoSellsCount = totalToGoSellsCountResponse?.totalSellCount;
      // todo: Total de ventas del tipo de venta to Go MONTO EN DINERO
      const totalToGoSellsAmount = totalToGoSellsCountResponse?.totalSellAmount;

      // todo: Total de ventas del tipo de venta Phone CANTIDAD

      const totalPhoneSellsCountResponse =
        await this.processService.especifTotalPeriodSells(
          periodId,
          'PHONE_ORDER',
        );
      const totalPhoneSellsCount = totalPhoneSellsCountResponse.totalSellCount;
      // todo: Total de ventas del tipo de venta Phone MONTO EN DINERO
      const totalPhoneSellsAmount =
        totalPhoneSellsCountResponse.totalSellAmount;
      // todo: Total de ventas del tipo de venta rappi CANTIDAD
      const totalRappiSellsCountResponse =
        await this.processService.especifTotalPeriodSells(
          periodId,
          'RAPPI_ORDER',
        );
      const totalRappiSellsCount = totalRappiSellsCountResponse.totalSellCount;
      // todo: Total de ventas del tipo de venta rappi MONTO EN DINERO
      const totalRappiSellsAmount =
        totalRappiSellsCountResponse.totalSellAmount;
      // todo: Total de ventas del tipo de pago efectivo MONTO EN DINERO
      const totalCashSellsResponse =
        await this.processService.especificSellsForPayment(periodId, 'cash');
      const totalCashSellsAmount = totalCashSellsResponse.totalAmount;
      // todo: Total de ventas del tipo de pago tarjeta de debito CANTIDAD
      const totalDebitSellsResponse =
        await this.processService.especificSellsForPayment(periodId, 'debit');
      const totalDebitSellsAmount = totalDebitSellsResponse.totalAmount;
      // todo: Total de ventas del tipo de pago tarjeta de credito MONTO EN DINERO
      const totalCreditSellsResponse =
        await this.processService.especificSellsForPayment(periodId, 'credit');
      const totalCreditSellsAmount = totalCreditSellsResponse.totalAmount;
      // todo: Total de ventas del tipo de pago transferencia MONTO EN DINERO

      const totalTransferSellsResponse =
        await this.processService.especificSellsForPayment(
          periodId,
          'transfer',
        );
      const totalTransferSellsAmount = totalTransferSellsResponse.totalAmount;
      // todo: Total de ventas del tipo de pago plataformasw delivery  MONTO EN DINERO,

      // todo: total de cuentas cobradas en el restaurante
      const billedAccounts = await this.billsService.findCurrentBySellType(
        periodId,
        'onsite',
      );
      const accountsBilled = billedAccounts.filter(
        (account) => account.status === FINISHED_STATUS,
      );
      // todo: Total clientes atendidos en el restaurante
      const filterDiner = accountsBilled.filter(
        (account) => account.status !== CANCELLED_STATUS,
      );
      const totalDiners = filterDiner.reduce((a, b) => {
        return a + b.diners;
      }, 0);

      const discountArray = await this.discountsService.findCurrent(id);

      const cancellationsArray = await this.cancellationService.findCurrent();

      const cancellationsTotalAmount = cancellationsArray
        .reduce((a, b) => a + parseFloat(b.cancelledAmount), 0)
        .toFixed(2);

      const discountTotal = discountArray.filter(
        (discount) => !discount.discountType.startsWith('COURTESY'),
      );

      const discountTotalAmount = discountTotal
        .reduce((a, b) => a + parseFloat(b.totalDiscountQuantity), 0)
        .toFixed(2);
      const courtesyTotal = discountArray.filter((discount) =>
        discount.discountType.startsWith('COURTESY'),
      );

      const courtesyTotalAmount = courtesyTotal
        .reduce((a, b) => a + parseFloat(b.totalDiscountQuantity), 0)
        .toFixed(2);

      // console.log(discountTotal);

      // todo: total de ordenes ToGo
      // todo: total de ordenes Phone
      // total de cuentas abiertas en el restaurante
      // total de cuentas en rappi
      // numero de descuentos aplicados
      // numero de descuentos aplicados en dinero
      // numero de notas con descuentos
      // numeo de notas con descuentos en dinero
      // numero de productos con descuentos
      // numeo de productos con descuentos en dinero
      // numero de cortesias aplicadas
      // numero de cortesias aplicadas en dinero
      // numero de notas con cortesias
      // numeo de notas con cortesias en dinero
      // numero de productos con cortesias
      // numeo de productos con cortesias en dinero
      // numero de cancelaciones
      // numero de cancelaciones en dinero
      // numero de notas con cancelaciones
      // numeo de notas con cancelaciones en dinero
      // numero de productos con cancelaciones
      // numeo de productos con cancelaciones en dinero

      /*/////////////////////////////////////////////////////////////////////////////
    ///////////////////ESTAS SON ALTERNATIVAS FUTURAS A AGREGAR ////////////////////
    //////////////////////////////////////////////////////////////////////////////*/

      // total de dinero en caja
      // total de dinero en tarjeta
      // total de dinero a requerir
      // total de dinero a pedir
      // total de dinero a retener
      // total de dinero a pagar
      // total de dinero a retirar
      // total de dinero a transferir
      // total de dinero a depositar
      // total de dinero a retirar

      const resumeData = {
        state: State.CLOSED,
        totalSellsAmount: totalSells, // Resumen de ventas
        totalRestaurantAmount: totalRestaurantSellsAmount, // Ventas por tipo de venta RESTAURANTE
        totalToGoOrdersAmount: totalToGoSellsAmount, // Ventas por tipo de venta PARA LLEVAR
        totalPhoneAmount: totalPhoneSellsAmount,
        totalRappiAmount: totalRappiSellsAmount,
        togoOrdersTotal: totalToGoSellsCount,
        totalCashInAmount: totalCashSellsAmount,
        phoneOrdersTotal: totalPhoneSellsCount,
        rappiOrdersTotal: totalRappiSellsCount,
        totalDebitAmount: totalDebitSellsAmount,
        totalCreditAmount: totalCreditSellsAmount,
        totalTransferAmount: totalTransferSellsAmount,
        restaurantOrdersTotal: totalRestaurantSellsCount,
        finishedAccounts: accountsBilled.length,
        totalDiners: totalDiners,
        numberOfDiscounts: discountTotal.length,
        discountTotalAmount: discountTotalAmount,
        discountsData: discountTotal.map((item) => item.toObject()),
        numberOfCourtesy: courtesyTotal.length,
        courtesyTotalAmount: courtesyTotalAmount,
        courtesyData: courtesyTotal.map((item) => item.toObject()),
        numberOfCancellations: cancellationsArray.length,
        cancellationsTotalAmount: cancellationsTotalAmount,
        // cancellationsData: cancellationTotal.map((item) => item.toObject()),
      };

      const bills = await this.billsService.findCurrent(periodId);
      const periodDate = currentDate.toISOString();
      await this.createSourcePeriod(bills, branchId, periodDate, resumeData);

      const updatedPeriod = await this.operatingPeriodModel.findByIdAndUpdate(
        periodId,
        {
          operationalClousure: resumeData,
        },
        { new: true },
      );
      if (!updatedPeriod) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo actualizar el periodo operativo');
      }
      await session.commitTransaction();
      session.endSession();
      return updatedPeriod;
    } catch (error) {
      console.log(error);
    }
  }

  async approvePeriod(id: string = '', body: any) {
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      // Actualizar solo el estado dentro de operationalClousure
      const period = await this.operatingPeriodModel.findById(id);
      const updatedPeriod = await this.operatingPeriodModel
        .findByIdAndUpdate(
          id,
          {
            ...period.toObject(),
            status: State.APPROVED,
            approvedBy: body.userId,
          },
          { new: true },
        )
        .populate({
          path: 'approvedBy',
        });
      if (!updatedPeriod) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo actualizar el periodo operativo');
      }
      await session.commitTransaction();
      session.endSession();
      return updatedPeriod;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async patchPeriod(id: string = '', body: any) {
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      // Actualizar solo el estado dentro de operationalClousure
      const updatedPeriod = await this.operatingPeriodModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              'operationalClousure.state': State.APPROVED,
              approvedBy: body.userId,
            },
          },
          { new: true },
        )
        .populate({
          path: 'approvedBy',
        });

      if (!updatedPeriod) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo actualizar el periodo operativo');
      }

      await session.commitTransaction();
      session.endSession();
      return updatedPeriod;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  // new pull request

  async createSourcePeriod(
    data: any,
    branchId: string,
    date: string,
    clousureData: any,
  ) {
    const session = await this.sourcePeriodModel.startSession();
    session.startTransaction();

    const newSourceData = {
      branchId,
      periodDate: date,
      accounts: data.map((bill) => bill?.toObject()),
      operationalClousure: clousureData,
    };

    try {
      const newSourcePeriod = new this.sourcePeriodModel(newSourceData);
      await newSourcePeriod.save();
      if (!newSourcePeriod) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo crear el periodo de fuente');
      }
      return newSourcePeriod;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async SearchSourcePeriodByBranchIdAndDate(body: any) {
    const session = await this.sourcePeriodModel.startSession();
    session.startTransaction();
    console.log(body);

    try {
      //  asi seria con una fecha en especifico
      // const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      // const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

      // aca por tiempo un minuto antes y 24 horas despues de crearse
      // const date = new Date(body.periodDate);
      // const startDate = new Date(date.getTime() - 60000); // 1 minuto antes
      // const endDate = new Date(date.getTime() + 86400000); // 24 horas después

      const date = new Date(body.periodDate);
      const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0,
      ).toISOString();
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ).toISOString();

      const sourcePeriod = await this.sourcePeriodModel.find({
        branchId: body.branchId,
        periodDate: { $gte: startDate, $lte: endDate },
      });
      console.log(sourcePeriod);

      if (!sourcePeriod || sourcePeriod.length === 0) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('No se pudo buscar el periodo de fuente');
      }
      return sourcePeriod;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
