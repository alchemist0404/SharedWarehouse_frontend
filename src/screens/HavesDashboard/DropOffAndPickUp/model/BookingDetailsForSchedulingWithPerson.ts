import { IBookingDetailsForSchedulingDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingDetailsDto';
import { IBriefBookingWithPersonDto } from '@screens/HavesDashboard/DropOffAndPickUp/model/BriefBookingWithPerson';

export interface IBookingDetailsForSchedulingWithPerson extends IBookingDetailsForSchedulingDto {
  booking: IBriefBookingWithPersonDto;
}
