import React from 'react';
import { ISearchSelector } from '../model/SearchSelector';
import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import { DateUtils } from 'react-day-picker';
import PureDatePicker from '@components/PureDatePicker';

export interface IDateSelectorProps extends ISearchSelector {
  value: IDatesData;
  onChange: (dates: IDatesData) => void;
  numberOfMonths?: number;
  singleDate?: boolean;
  disabledDays?: (day: Date) => boolean;
  initialMonth?: Date;
}

const DateSelector: React.FC<IDateSelectorProps> = (
  { value, onChange, numberOfMonths = 2, singleDate, disabledDays, initialMonth }
) => {
  const { startingDate: from, endingDate: to } = value || {};

  const handleDayClick = day => {
    if (disabledDays && disabledDays(day)) {
      return;
    }
    if (singleDate) {
      onChange({ startingDate: day });
    } else {
      const newRange = DateUtils.addDayToRange(day, { from, to });
      onChange({
        startingDate: newRange.from,
        endingDate: newRange.to?.toString() === newRange.from?.toString() ? null : newRange.to
      });
    }
  };

  return (
    <PureDatePicker
      singleDate={singleDate}
      numberOfMonths={numberOfMonths}
      selectedDays={[from, { from, to }]}
      onDayClick={handleDayClick}
      modifiers={{ start: from, end: to }}
      disabledDays={disabledDays}
      initialMonth={initialMonth}
    />
  );
};

export default DateSelector;
