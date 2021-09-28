import React, { useCallback, useState } from 'react';
import { Button, Header, Label, LabelGroup, Popup } from 'semantic-ui-react';
import { IBriefBookingDto } from '@screens/UserMain/model/Booking';
import { BookingStatus, colorOfStatus } from '@models/domain/BookingStatus';
import styles from './styles.module.scss';
import { Role } from '@screens/Authorization/models/Roles';
import CancelBookingModal from '@containers/Schedules/BookingDetailsModal/BookingDetails/CancelBookingModal';
import moment from 'moment';
import { DATE_FORMAT } from '@helpers/date.helper';
import { DateUtils } from 'react-day-picker';
import { IBindingCallback1 } from '@models/Callbacks';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';

export interface IBookingDetailsProps<B extends IBriefBookingDto> {
  booking: B;
  currentRole?: Role;
  onCancellationSubmit?: IBindingCallback1<IBookingCancellationRequest>;
  cancellationLoading?: boolean;
}

function BookingDetails<BookingDto extends IBriefBookingDto>(
  { booking, currentRole, onCancellationSubmit, cancellationLoading }: IBookingDetailsProps<BookingDto>
) {
  const [cancelModalShown, setCancelModalShown] = useState<boolean>(false);

  const firstDayNextMonth = moment().add(1, 'months').startOf('month').toDate();
  const lastBookingDay = booking?.endingDate && moment(booking?.endingDate).toDate();

  const ableToUpdate = currentRole === Role.NEED && booking?.status === BookingStatus.CONFIRMED;
  const noDaysToCancel = firstDayNextMonth
    && lastBookingDay
    && DateUtils.isDayBefore(lastBookingDay, firstDayNextMonth);

  const handleSubmitDate = useCallback((cancellationDate: Date) => {
    if (onCancellationSubmit && booking) {
      onCancellationSubmit({ bookingId: booking.id, cancellationDate });
    }
  }, [onCancellationSubmit, booking]);

  return (
    <div className={styles.container}>
      <div>
        <Header>Booking</Header>
        <LabelGroup>
          <span>Status:&nbsp;</span>
          <Label color={colorOfStatus(booking.status)}>{booking.status}</Label>
        </LabelGroup>
        <LabelGroup>
          <span>From:&nbsp;</span>
          <span>{moment(booking.startingDate).format(DATE_FORMAT)}</span>
        </LabelGroup>
        {booking.endingDate && (
          <LabelGroup>
            <span>To:&nbsp;</span>
            <span>{moment(booking.endingDate).format(DATE_FORMAT)}</span>
          </LabelGroup>
        )}
      </div>
      {ableToUpdate && (
        <Popup
          trigger={(
            <div>
              <Button
                color="red"
                content="Cancel"
                onClick={() => setCancelModalShown(true)}
                disabled={noDaysToCancel}
                loading={cancellationLoading}
              />
            </div>
          )}
          content="You have already paid for the whole booking"
          disabled={!noDaysToCancel}
        />
      )}
      <CancelBookingModal
        open={cancelModalShown}
        onClose={() => setCancelModalShown(false)}
        firstDayNextMonth={firstDayNextMonth}
        lastBookingDay={lastBookingDay}
        onSubmitDate={handleSubmitDate}
      />
    </div>
  );
}

export default BookingDetails;
