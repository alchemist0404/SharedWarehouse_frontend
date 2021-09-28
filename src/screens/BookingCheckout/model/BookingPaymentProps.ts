import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';

export interface IBookingPaymentProps {
  price: IPriceWithCurrency;
  transactionId: string;
  userEmail?: string;
}
