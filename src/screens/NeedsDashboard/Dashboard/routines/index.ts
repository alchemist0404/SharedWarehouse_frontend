import { createRoutine } from 'redux-saga-routines';

const createDashboardRoutine = actionName => createRoutine(`NEEDS_DASHBOARD__DASHBOARD:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const toggleFavoriteBuildingRoutine = createDashboardRoutine('TOGGLE_FAVORITE_BUILDING');
export const fetchMyTransactionsRoutine = createDashboardRoutine('FETCH_MY_TRANSACTIONS');
export const fetchMyBuildingsRoutine = createDashboardRoutine('FETCH_MY_BUILDINGS');
