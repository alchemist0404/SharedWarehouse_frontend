import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';
import { LengthUnit } from '@models/domain/LengthUnit';
import { SpaceCategory } from '@models/domain/space/SpaceCategories';
import { IBaseAuditable } from '@models/domain/BaseAuditable';
import { SpaceType } from '@models/domain/space/SpaceTypes';

export interface IPaymentRequirementResponse {
  priceSummary: IPriceSummary;
  dateFrom: Date;
  dateTo: Date;
  days: number;
  transactionId: string;
  nextPayment: IPaymentRequirementResponse | undefined;
}

export interface IPriceSummary {
  sumToPay: IPriceWithCurrency;
  pricesToSpaces: IPriceToSpaces[];
}

export interface IPriceToSpaces {
  pricePerDay: IPriceWithCurrency;
  pricePerPeriod: IPriceWithCurrency;
  spaces: number;
  spaceTemplate: ISpaceTemplateDto;
}

export interface ISpaceTemplateDto extends IBaseAuditable {
  id: string;
  alias: string;
  pricePerDay: IPriceWithCurrency;
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  category: SpaceCategory;
  type: SpaceType;
}
