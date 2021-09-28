import { createRoutine } from 'redux-saga-routines';

const createTransactionsRoutine = actionName => createRoutine(`NEEDS_DASHBOARD__TRANSACTIONS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setPageRoutine = createTransactionsRoutine('SET_PAGE');
export const fetchTransactionsRoutine = createTransactionsRoutine('FETCH_TRANSACTIONS');
