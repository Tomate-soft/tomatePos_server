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

  @Prop({ type: String })
  totalSellsAmount: string;

  @Prop({ type: String })
  totalRestaurantAmount: string;

  @Prop({ type: String })
  totalToGoAmount: string;

  @Prop({ type: String })
  totalPhoneAmount: string;

  @Prop({ type: String })
  totalRappiAmount: string;

  @Prop({ type: String })
  totalCashInAmount: string;

  @Prop({ type: String })
  totalDebitAmount: string;

  @Prop({ type: String })
  totalCreditAmount: string;

  @Prop({ type: String })
  totalTransferAmount: string;

  @Prop({ type: String })
  totalDeliveryAmount: string;

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
