/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createFinancialBankingRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__FINANCIAL_BANKING:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const updateBankingDataRoutine = createFinancialBankingRoutine('UPDATE_BANKING_DATA');
export const loadBankingDataRoutine = createFinancialBankingRoutine('LOAD_BANKING_DATA');
