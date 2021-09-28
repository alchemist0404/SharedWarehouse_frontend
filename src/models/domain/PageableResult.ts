export interface IPageableResult<T> {
  items: T[];
  totalPages: number;
  totalResults: number;
}
