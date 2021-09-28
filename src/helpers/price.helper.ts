import _ from 'lodash';
import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';

export const toPrice = (price: number | IPriceWithCurrency): string => {
  if (typeof price === 'number') {
    return _.round(price, 2).toFixed(2);
  }
  let sign = '';
  if (typeof price === 'object') {
    if (price.currency === 'USD') {
      sign = '$';
    }
    return `${sign}${toPrice(price.amount)}`;
  }
  return price;
};
