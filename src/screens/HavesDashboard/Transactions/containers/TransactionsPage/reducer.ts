import { Routine } from 'redux-saga-routines';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { fetchTransactionsRoutine, setPageRoutine } from '@screens/HavesDashboard/Transactions/routines';

export const transactionsReducer = (state = getInitialPageableState<ITransaction>(), action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case fetchTransactionsRoutine.SUCCESS:
      return {
        ...state,
        items: payload.items,
        totalResults: payload.totalResults,
        totalPages: payload.totalPages
      };
    case setPageRoutine.FULFILL:
      return {
        ...state,
        page: payload
      };
    default:
      return state;
  }
};
