import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReportsService } from 'src/reports/reports.service';
import { CashierSession } from 'src/schemas/cashierSession/cashierSession';
import { OperatingPeriod } from 'src/schemas/operatingPeriod/operatingPeriod.schema';

@Injectable()
export class ClousuresOfOperationsService {
  constructor(
    @InjectModel(OperatingPeriod.name)
    private operatingPeriodModel: Model<OperatingPeriod>,
    @InjectModel(CashierSession.name)
    private cashierSessionModel: Model<CashierSession>,
    private reportsService: ReportsService,
  ) {}

  async closePeriod(body: any) {
    const session = await this.operatingPeriodModel.startSession();
    session.startTransaction();
    try {
      const currentPeriod = await this.operatingPeriodModel.findOne();
      if (!currentPeriod) {
        throw new NotFoundException(
          'No se encontro ningun periodo actualmente',
        );
      }
      await session.commitTransaction();
      session.endSession();
      return currentPeriod;
    } catch (error) {}
    // return await this.operatingPeriodModel.find();
  }

  async closeCashierSession(body: any) {
    // Requested Data
    const currentSession = await this.cashierSessionModel
      .findOne({
        _id: body.session._id,
      })
      .populate({
        path: 'bills',
        populate: { path: 'payment' },
      });

    // calculate cash diference
    const concentratedPayments = currentSession.bills.flatMap(
      (bill) => bill.payment,
    );

    // VAMOS A REVISAR LAS TRANSACTIONS  EN EL FRONTEND PARA VER COMO FUNCIONA

    // vamos a apliocar filter a concentratedPayments para que solo nos devuelva los valores que sean de tipo efectivo
    // necesitamos las transaciones concentrarlas en un solo array para filtrarlas, elas transacciones dentro de los paymenmts, estan diferenciadas por el tipo de pago
    // luego sumaremos cada una para lograr las cantidad a pedir

    /* 
   ya teniando el array vamos a filtrar cada uno por "cash", "debit", "credit", "transfer" 
    y sumaremos cada uno de los valores para obtener el total de cada uno y lo guardaremos en una variable para luego pasarlo al reporte
    por ejemplo si tenemos un array de pagos de la siguiente manera

    const requestCash = arrayDeTransacciones.filter((payment) => payment.type === 'cash');
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

    const dataForPrint = { ...body, totalCash: concentratedPayments };

    const report = await this.reportsService.closeCashierSession(dataForPrint);

    return body;
  }
}
