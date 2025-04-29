import { Prop, Schema } from '@nestjs/mongoose';

export enum State {
  ACTIVE = 'ACTIVE',
  CONFLICT = 'CONFLICT',
  CLOSED = 'CLOSED',
  APPROVED = 'APPROVED',
}

@Schema()
export class OperationalClousure {
  @Prop({ type: String, enum: State })
  state: State;

  @Prop({ type: Number })
  totalSellsAmount: number;

  @Prop({ type: Number })
  totalRestaurantAmount: number;

  @Prop({ type: Number })
  totalToGoOrdersAmount: number;

  @Prop({ type: Number })
  totalPhoneAmount: number;

  @Prop({ type: Number })
  totalRappiAmount: number;

  @Prop({ type: Number })
  togoOrdersTotal: number;

  @Prop({ type: Number })
  totalCashInAmount: number;

  @Prop({ type: Number })
  phoneOrdersTotal: number;

  @Prop({ type: Number })
  rappiOrdersTotal: number;

  @Prop({ type: Number })
  totalDebitAmount: number;

  @Prop({ type: Number })
  totalCreditAmount: number;

  @Prop({ type: Number })
  totalTransferAmount: number;

  @Prop({ type: Number })
  restaurantOrdersTotal: number;

  @Prop({ type: Number })
  finishedAccounts: number;

  @Prop({ type: Number })
  totalDiners: number;

  @Prop({ type: Number })
  numberOfDiscounts: number;

  @Prop({ type: Array })
  discountsData: any[];

  @Prop({ type: Number })
  discountTotalAmount: number;

  @Prop({ type: Number })
  numberOfCourtesy: number;

  @Prop({ type: Array })
  courtesyData: any[];
  /* Hasta aqui vamos solo nos falta agregar las cancelaciones 
     y agregar la data por categorias agrupadas, esto no es prioridad
     sin embargo se tendra que lanzar antes de llegar a produccion */

  @Prop({ type: Number })
  courtesyTotalAmount: number;

  @Prop({ type: Number })
  numberOfCancellations: number;

  @Prop({ type: Number })
  cancellationsTotalAmount: number;
}
