import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import { BillingPeriod } from '@models/domain/BillingPeriod';

export interface IBookingRequest {
  dates: IDatesData;
  billingPeriod: BillingPeriod;
  note: string;
  spacesToAmount: ISpaceToAmount[];
}

export interface ISpaceToAmount {
  spaceTemplateId: string;
  amount: number;
  spacesNotes?: string[];
}
