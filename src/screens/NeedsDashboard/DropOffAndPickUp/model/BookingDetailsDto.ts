import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { ISpaceTemplateDto } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { IBuildingForDisplaying, ISpaceWithAvailability } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { Currency } from '@models/domain/Currency';

export interface IBookingDetailsForSchedulingDto {
  booking: IBriefBookingDto;
  building: IBuildingForDisplaying;
  templatesToAmounts: ITemplate2Amount[];
  needsReview: boolean;
}

export interface ITemplate2Amount {
  spaceIds: string[];
  spaceTemplate: ISpaceTemplateDto;
}

export const t2aToSpaceWithAvailability: (t2a: ITemplate2Amount) => ISpaceWithAvailability = ({ spaceTemplate, spaceIds }) => ({
  currency: Currency[spaceTemplate.pricePerDay.currency],
  spaceType: spaceTemplate.type,
  spaceCategory: spaceTemplate.category,
  amountAvailable: spaceIds.length,
  spaceIdsAvailable: spaceIds,
  alias: spaceTemplate.alias,
  pricePerDay: spaceTemplate.pricePerDay.amount,
  height: spaceTemplate.height,
  id: spaceTemplate.id,
  length: spaceTemplate.length,
  lengthUnit: spaceTemplate.lengthUnit,
  width: spaceTemplate.width
});
