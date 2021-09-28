import { fetchTransactionsRoutine, setPageRoutine } from '@screens/NeedsDashboard/Transactions/routines';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { createReducer } from '@reduxjs/toolkit';

export const transactionsReducer = createReducer(getInitialPageableState<ITransaction>(), {
  [fetchTransactionsRoutine.SUCCESS]: (state, { payload }) => {
    state.items = payload.items;
    state.totalResults = payload.totalResults;
    state.totalPages = payload.totalPages;
  },
  [setPageRoutine.FULFILL]: (state, { payload }) => {
    state.page = payload;
  }
});
