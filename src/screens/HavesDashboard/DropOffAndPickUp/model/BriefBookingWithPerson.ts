import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { IBriefUserDto } from '@screens/HavesDashboard/DropOffAndPickUp/model/BriefUserDto';

export interface IBriefBookingWithPersonDto extends IBriefBookingDto {
  personBooked: IBriefUserDto;
}
