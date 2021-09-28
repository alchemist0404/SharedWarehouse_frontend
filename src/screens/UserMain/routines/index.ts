import { createRoutine } from 'redux-saga-routines';

const createUserMainRoutine = actionName => createRoutine(`USER_MAIN:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchTransactionsRoutine = createUserMainRoutine('FETCH_TRANSACTIONS');
export const fetchBookingsRoutine = createUserMainRoutine('FETCH_BOOKINGS');
