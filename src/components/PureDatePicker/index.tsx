import React from 'react';
import styles from './styles.module.scss';
import DayPicker, { DateUtils } from 'react-day-picker';
import { DayPickerProps } from 'react-day-picker/types/Props';

export interface IDatePickerProps extends DayPickerProps {
  disabledDays?: (day: Date) => boolean;
  singleDate: boolean;
}

const PureDatePicker: React.FC<IDatePickerProps> = (
  { className, singleDate, disabledDays = DateUtils.isPastDay, ...props }
) => (
  <DayPicker
    {...props}
    className={`${styles.container} ${className} ${singleDate && styles.single_date}`}
    disabledDays={disabledDays}
  />
);

export default PureDatePicker;
