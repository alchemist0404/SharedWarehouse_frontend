import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';
import moment from 'moment';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';

export interface IDatesInfoProps {
  booking?: IBriefBookingDto;
}

const DatesInfo: React.FC<IDatesInfoProps> = ({ booking }) => (
  <>
    <h4 className={s.details__contract}>{`${booking?.billingPeriod} CONTRACT`}</h4>
    <h3>
      Starting&nbsp;
      <b>{booking?.startingDate && moment(booking.startingDate).format('LL')}</b>
    </h3>
    {booking?.endingDate && (
      <h3>
        Ending&nbsp;
        <b>{booking?.endingDate && moment(booking.endingDate).format('LL')}</b>
      </h3>
    )}
  </>
);

export default DatesInfo;
