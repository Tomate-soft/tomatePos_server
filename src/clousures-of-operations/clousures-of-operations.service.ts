import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parse } from 'path';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { ReportsService } from 'src/reports/reports.service';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { Bills } from 'src/schemas/ventas/bills.schema';
import { PhoneOrder } from 'src/schemas/ventas/orders/phoneOrder.schema';
import { RappiOrder } from 'src/schemas/ventas/orders/rappiOrder.schema';
import { ToGoOrder } from 'src/schemas/ventas/orders/toGoOrder.schema';

@Injectable()
export class ClousuresOfOperationsService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    private reportsService: ReportsService,
    private operatingPeriodService: OperatingPeriodService,
    @InjectModel(Bills.name) private billsModel: Model<Bills>,
    @InjectModel(ToGoOrder.name) private toGoOrderModel: Model<ToGoOrder>,
    @InjectModel(RappiOrder.name) private rappiOrderModel: Model<RappiOrder>,
    @InjectModel(PhoneOrder.name) private phoneOrderModel: Model<PhoneOrder>,
  ) {}

  async closePeriod(body: any) {
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodService.getCurrent();
      if (!currentPeriod) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }
      // traeremos todas  las cuentas que matching con el periodo actual
      const bills = await this.billsModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      // traeremos todas las ordenes que matching con el periodo actual
      const toGoOrders = await this.toGoOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      console.log('toGoOrders', toGoOrders);
      const rappiOrders = await this.rappiOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      console.log('rappiOrders', rappiOrders);
      const phoneOrders = await this.phoneOrderModel
        .find({
          operatingPeriod: currentPeriod[0]._id,
        })
        .populate({
          path: 'payment',
          populate: {
            path: 'transactions',
          },
        });
      console.log('phoneOrders', phoneOrders);

      const allOrders = [
        ...bills,
        ...toGoOrders,
        ...rappiOrders,
        ...phoneOrders,
      ];
      session.endSession();
      return allOrders;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
    // return await this.operatingPeriodModel.find();
  }

  async closeCashierSession(body: any) {
    const currentSession = await this.cashierSessionModel
      .findById(body.session._id)
      .populate({
        path: 'bills',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'togoorders',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'rappiOrders',
        populate: { path: 'payment' },
      })
      .populate({
        path: 'phoneOrders',
        populate: { path: 'payment' },
      });

    // calculate cash diference
    const restaurantPayments = currentSession.bills.flatMap(
      (bill) => bill.payment,
    );

    const togoPayments = currentSession.togoorders.flatMap(
      (bill) => bill.payment,
    );

    const rappiPayments = currentSession.rappiOrders.flatMap(
      (bill) => bill.payment,
    );

    const phonePayments = currentSession.phoneOrders.flatMap(
      (bill) => bill.payment,
    );

    const concentratedPayments = [
      ...restaurantPayments,
      ...togoPayments,
      ...rappiPayments,
      ...phonePayments,
    ];

    // VAMOS A REVISAR LAS TRANSACTIONS  EN EL FRONTEND PARA VER COMO FUNCIONA
    // vamos a apliocar filter a concentratedPayments para que solo nos devuelva los valores que sean de tipo efectivo
    // necesitamos las transaciones concentrarlas en un solo array para filtr carlas, elas transacciones dentro de los paymenmts, estan diferenciadas por el tipo de pago
    // luego sumaremos cada una para lograr las cantidad a pedir
    // ya teniando el array vamos a filtrar cada uno por "cash", "debit", "credit", "transfer"
    // y sumaremos cada uno de los valores para obtener el total de cada uno y lo guardaremos en una variable para luego pasarlo al reporte
    // por ejemplo si tenemos un array de pagos de la siguiente manera

    const requestCash = concentratedPayments.flatMap(
      (payment) => payment.transactions,
    );

    const totalCash = requestCash
      .filter((payment) => payment.paymentType === 'cash')
      .reduce((acc, curr) => acc + parseFloat(curr.payQuantity), 0);

    /* 

    const requestDebit = arrayDeTransacciones.filter((payment) => payment.type === 'debit');
    const requestCredit = arrayDeTransacciones.filter((payment) => payment.type === 'credit');
    const requestTransfer = arrayDeTransacciones.filter((payment) => payment.type === 'transfer');

    tmb debemos sumar los totales que nos interesan para el reporte
    // saldo total en tarjeta
    // saldo todal cobrado que es total de efectivo + total de tarjeta + cualquier otroa ingreso disponible
    // saldo total a requerir que es total de efectivo menos el total de efectivo que se tiene en caja menos salidas de efectivo que se hayan hecho.

    // por ultimo agreguemos datos relevantes de venta
    // cuantas cuentas se atendieron
      // cuantas cuentas canceladas
    const canceledAccounts = currentSession.bills.filter((bill) => bill.status === 'calcel') o algo asi

    // Descuentos echos a cuenta
    // Descuentos echos a notas
    // Descuentos echos a productos
    // cortesias echas a cuenta
    // cortesias echas a notas
    // cortesias echas a productos
    // total de los descuentos en dinero
    // total de las cortesias en dinero
    // por ultimo el resultado de la operacion de caja, es decir si hace falta o sobra dinero en caja.

    // hay que recuperar tmb datos del encabezado
    // como la fecha
    // el nombre dle cajero
    // Folio de corte

*/

    const dataForPrint = {
      ...body,
      totalCash: totalCash,
      cashAmount: requestCash,
    };
    console.log(dataForPrint);

    // const report = await this.reportsService.closeCashierSession(dataForPrint);

    return dataForPrint;
  }
}
