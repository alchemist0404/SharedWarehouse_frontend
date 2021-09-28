import { createRoutine } from 'redux-saga-routines';

const createLandingRoutine = actionName => createRoutine(`LANDING:${actionName}`);

export const setSearchFiltersRoutine = createLandingRoutine('SET_SEARCH_FILTERS');
