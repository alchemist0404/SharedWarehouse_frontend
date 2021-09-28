import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { transactionsReducer } from '@screens/HavesDashboard/Transactions/containers/TransactionsPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { fetchTransactionsRoutine, setPageRoutine } from '@screens/HavesDashboard/Transactions/routines';
import { reducerCreator } from '@helpers/reducer.helper';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  fetchTransactionsRequest: reducerCreator([fetchTransactionsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: transactionsReducer
});

const reqs = (state: RootState) => state.havesDashboard.transactions.requests;
const data = (state: RootState) => state.havesDashboard.transactions.data;

export const extractTransactions = state => data(state).items;
export const extractTotalPages = state => data(state).totalPages;
export const extractTotalResults = state => data(state).totalResults;
export const extractCurrentPage = state => data(state).page;
export const extractCurrentSize = state => data(state).pageSize;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractFetchTransactionsLoading = state => reqs(state).fetchTransactionsRequest.loading;
export const extractFetchTransactionsError = state => reqs(state).fetchTransactionsRequest.error;
