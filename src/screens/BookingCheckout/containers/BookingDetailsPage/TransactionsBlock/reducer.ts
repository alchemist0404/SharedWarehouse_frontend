import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { fetchTransactionsRoutine, setTransactionsPageRoutine } from '@screens/BookingCheckout/routines';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { IPageableResult } from '@models/domain/PageableResult';

const initialState = {
  transactions: { ...getInitialPageableState<ITransaction>(), pageSize: 5 }
};

export const bookingDetailsPageReducer = createReducer(initialState, {
  [fetchTransactionsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IPageableResult<ITransaction>>) => {
    state.transactions = {
      ...state.transactions,
      ...payload
    };
  },
  [setTransactionsPageRoutine.FULFILL]: (state, { payload }: PayloadAction<number>) => {
    state.transactions.page = payload;
  }
});
