import { PageSize } from '@screens/BrowseSpaces/model/PageSize';

export interface IPageableReducerState<T> extends IPageable {
  items: T[];
}

export interface IPageable {
  totalPages: number;
  page: number;
  totalResults?: number;
  pageSize?: PageSize | number;
}

export function getInitialPageableState<T>(): IPageableReducerState<T> {
  return ({
    items: [],
    totalPages: 0,
    totalResults: 0,
    page: 1,
    pageSize: PageSize.TWENTY_FIVE
  });
}
