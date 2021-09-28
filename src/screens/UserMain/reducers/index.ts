import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { userMainReducer } from '@screens/UserMain/containers/UserMainPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchBookingsRoutine, fetchTransactionsRoutine } from '@screens/UserMain/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchTransactionsRequest: reducerCreator([fetchTransactionsRoutine.TRIGGER]),
  fetchBookingsRequest: reducerCreator([fetchBookingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: userMainReducer
});

const reqs = (state: RootState) => state.userMain.requests;
const data = (state: RootState) => state.userMain.data;

export const extractBookings = state => data(state).bookings;
export const extractTransactions = state => data(state).transactions;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchTransactionsLoading = state => reqs(state).fetchTransactionsRequest.loading;
export const extractFetchTransactionsError = state => reqs(state).fetchTransactionsRequest.error;
export const extractFetchBookingsLoading = state => reqs(state).fetchBookingsRequest.loading;
export const extractFetchBookingsError = state => reqs(state).fetchBookingsRequest.error;
