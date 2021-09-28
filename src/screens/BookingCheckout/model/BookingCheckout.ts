import { IBuildingForDisplaying, ISpaceDto } from '@screens/BuildingDetails/model/BuildingDetailsResponse';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';

export interface IBookingCheckoutData {
  building: IBuildingForDisplaying;
  booking: IBookingWithSpaces;
}

export interface IBookingWithSpaces {
  booking: IBriefBookingDto;
  spaces: ISpaceBooked[];
}

export interface ISpaceBooked extends ISpaceDto {
  amountBooked: number;
}
