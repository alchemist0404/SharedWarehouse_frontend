import { BillingPeriod } from '@models/domain/BillingPeriod';
import { IBaseAuditable } from '@models/domain/BaseAuditable';
import { BookingStatus } from '@models/domain/BookingStatus';

export interface IBriefBookingDto extends IBaseAuditable {
  startingDate: Date;
  endingDate: Date;
  costPerDay: IPriceWithCurrency;
  status: BookingStatus;
  note: string;
  billingPeriod: BillingPeriod;
  stripeSubscriptionId: string;
  paypalSubscriptionId: string;
}

export interface IPriceWithCurrency {
  amount: number;
  currency: string;
}
