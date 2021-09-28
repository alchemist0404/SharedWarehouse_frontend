import React from 'react';
import NeedsBookingDetails, { IBookingDetailsProps as NeedsBookingProps } from '@containers/Schedules/BookingDetailsModal/BookingDetails';
import { IBriefBookingWithPersonDto } from '@screens/HavesDashboard/DropOffAndPickUp/model/BriefBookingWithPerson';

export type IBookingDetailsProps = NeedsBookingProps<IBriefBookingWithPersonDto>;

const BookingDetails: React.FC<IBookingDetailsProps> = ({ booking }) => (
  <>
    <NeedsBookingDetails booking={booking} />
    <div>
      {`Person booked: ${booking.personBooked.firstName} ${booking.personBooked.lastName}`}
    </div>
  </>
);

export default BookingDetails;
