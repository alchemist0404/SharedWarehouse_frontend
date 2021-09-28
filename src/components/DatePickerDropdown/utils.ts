import { IDatesData } from '@screens/BrowseSpaces/model/QueryData';
import { isNil } from 'lodash';
import moment from 'moment';

export const textFromDates = (dates?: IDatesData) => {
  if (isNil(dates?.startingDate)) {
    return 'Pick a date';
  }
  if (isNil(dates?.endingDate)) {
    return moment(dates.startingDate).format('L');
  }
  return `${moment(dates.startingDate).format('L')} - ${
    moment(dates.endingDate).format('L')}`;
};
