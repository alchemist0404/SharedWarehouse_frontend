/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createTransactionsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__TRANSACTIONS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setPageRoutine = createTransactionsRoutine('SET_PAGE');
export const fetchTransactionsRoutine = createTransactionsRoutine('FETCH_TRANSACTIONS');
