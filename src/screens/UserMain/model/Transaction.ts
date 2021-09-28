import { IBaseAuditable } from '@models/domain/BaseAuditable';
import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';

export interface ITransaction extends IBaseAuditable {
  id: string;
  bookingId: string;
  dateTime: Date;
  paid: boolean;
  paidFrom: Date;
  paidTo: Date;
  stripeId: string;
  paypalId: string;
  price: IPriceWithCurrency;
}
