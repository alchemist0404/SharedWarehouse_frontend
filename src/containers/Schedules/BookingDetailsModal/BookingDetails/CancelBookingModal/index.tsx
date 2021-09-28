import React, { FC, useCallback, useState } from 'react';
import { Button, Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { DateUtils } from 'react-day-picker';
import DateSelector from '@screens/Landing/components/search/selectors/DateSelector';
import styles from './styles.module.scss';

export interface ICancelBookingModalProps {
  open?: boolean;
  onClose?: IBindingAction;
  firstDayNextMonth: Date;
  lastBookingDay: Date;
  onSubmitDate: IBindingCallback1<Date>;
}

const CancelBookingModal: FC<ICancelBookingModalProps> = (
  { open, onClose, firstDayNextMonth, lastBookingDay, onSubmitDate }
) => {
  const [day, setDay] = useState<Date | undefined>();

  const handleSubmitDate = useCallback(() => {
    onClose();
    onSubmitDate(day);
  }, [day, onClose, onSubmitDate]);

  return (
    <Modal open={open} onClose={onClose} size="tiny" closeIcon>
      <ModalHeader>Cancel Booking</ModalHeader>
      <ModalContent className={styles.container}>
        <div className={styles.note}>
          Choose the day to cancel.
          <br />
          All drop-offs and pick-ups starting from the selected date will be deleted
        </div>
        <DateSelector
          initialMonth={firstDayNextMonth}
          disabledDays={
            date => (DateUtils.isDayBefore(date, firstDayNextMonth))
              || (lastBookingDay && DateUtils.isDayAfter(date, lastBookingDay))
          }
          value={{ startingDate: day }}
          onChange={({ startingDate }) => setDay(startingDate)}
          numberOfMonths={1}
          singleDate
        />
      </ModalContent>
      <ModalActions>
        <Button
          content="Cancel"
          color="red"
          onClick={onClose}
        />
        <Button
          content="Submit"
          color="green"
          disabled={!day}
          onClick={handleSubmitDate}
        />
      </ModalActions>
    </Modal>
  );
};

export default CancelBookingModal;
