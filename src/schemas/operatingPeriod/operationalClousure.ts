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

  //////////////////////////////////////////
  //// Ventas por tipo de venta   //////////
  //////////////////////////////////////////

  @Prop({ type: Number })
  totalRestaurantAmount: number;

  @Prop({ type: Number })
  totalToGoOrdersAmount: number;

  @Prop({ type: Number })
  totalPhoneAmount: number;

  @Prop({ type: Number })
  totalRappiAmount: number;

  //////////////////////////////////////////
  ///// Ventas por tipo de pago ////////////
  //////////////////////////////////////////

  @Prop({ type: Number })
  totalCashInAmount: number;

  @Prop({ type: Number })
  totalDebitAmount: number;

  @Prop({ type: Number })
  totalCreditAmount: number;

  @Prop({ type: Number })
  totalTransferAmount: number;

  @Prop({ type: Number })
  totalDeliveryAmount: number;

  @Prop({ type: Number })
  totalDiners: number;

  @Prop({ type: Number })
  finishedAccounts: number;

  @Prop({ type: Number })
  togoOrdersTotal: number;

  @Prop({ type: Number })
  phoneOrdersTotal: number;

  @Prop({ type: Number })
  restaurantOrdersTotal: number;

  @Prop({ type: Number })
  rappiOrdersTotal: number;

  @Prop({ type: Number })
  numberOfDiscounts: number;

  @Prop({ type: String })
  discountTotalAmount: string;

  @Prop({ type: Number })
  numberOfNotesWithDiscount: number;

  @Prop({ type: String })
  notesWithDiscountTotalAmount: string;

  @Prop({ type: Number })
  numberOfproductsWithDiscount: number;

  @Prop({ type: String })
  productsWithDiscountTotalAmount: string;

  @Prop({ type: Number })
  numberOfCourtesies: number;

  @Prop({ type: String })
  courtesiesTotalAmount: string;

  @Prop({ type: Number })
  numberOfNotesWithCourtesy: number;

  @Prop({ type: String })
  notesWithCourtesyTotalAmount: string;

  @Prop({ type: Number })
  numberOfproductsWithCourtesy: number;

  @Prop({ type: String })
  productsWithCourtesyTotalAmount: string;

  @Prop({ type: Number })
  numberOfCancellations: number;

  @Prop({ type: String })
  cancellationsTotalAmount: string;

  @Prop({ type: Number })
  numberOfNotesWithCancellation: number;

  @Prop({ type: String })
  notesWithCancellationTotalAmount: string;

  @Prop({ type: Number })
  numberOfproductsWithCancellation: number;

  @Prop({ type: String })
  productsWithCancellationTotalAmount: string;
}
