import { createReducer } from '@reduxjs/toolkit';
import { IBankingData } from '@screens/HavesDashboard/FinancialBanking/model/BankingData';
import { loadBankingDataRoutine, updateBankingDataRoutine } from '@screens/HavesDashboard/FinancialBanking/routines';

export interface IFinancialBankingReducerState {
  bankingData?: IBankingData;
}

const initialState: IFinancialBankingReducerState = {
};

export const financialBankingReducer = createReducer(initialState, {
  [loadBankingDataRoutine.SUCCESS]: (state, { payload }) => {
    state.bankingData = payload;
  },
  [updateBankingDataRoutine.SUCCESS]: (state, { payload }) => {
    state.bankingData = payload;
  }
});
