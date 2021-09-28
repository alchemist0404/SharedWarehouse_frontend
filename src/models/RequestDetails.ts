import { IBindingCallback1 } from '@models/Callbacks';

export interface IRequestDetails<T, Query = string> {
  items: T[];
  loading: boolean;
  load: IBindingCallback1<Query>;
}
