import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { financialBankingReducer } from '@screens/HavesDashboard/FinancialBanking/containers/FinancialBankingPage/reducer';
/* PlopJS import placeholder. Do not remove */
import { loadBankingDataRoutine, updateBankingDataRoutine } from '@screens/HavesDashboard/FinancialBanking/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  updateBankingDataRequest: reducerCreator([updateBankingDataRoutine.TRIGGER]),
  loadBankingDataRequest: reducerCreator([loadBankingDataRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: financialBankingReducer
});

const reqs = (state: RootState) => state.havesDashboard.financialBanking.requests;
const data = (state: RootState) => state.havesDashboard.financialBanking.data;

export const extractBankingData = state => data(state).bankingData;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractUpdateBankingDataLoading = state => reqs(state).updateBankingDataRequest.loading;
export const extractUpdateBankingDataError = state => reqs(state).updateBankingDataRequest.error;
export const extractLoadBankingDataLoading = state => reqs(state).loadBankingDataRequest.loading;
export const extractLoadBankingDataError = state => reqs(state).loadBankingDataRequest.error;
