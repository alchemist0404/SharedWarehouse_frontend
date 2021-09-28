import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';

export interface IResultBuildingItem {
  id: string;
  name: string;
  avatar: string;
  meta: string;
  liked?: boolean;
  likeLoading?: boolean;
  lowestPrice?: IPriceWithCurrency;
}
