import { createRoutine } from 'redux-saga-routines';

const createFavoritesRoutine = actionName => createRoutine(`NEEDS_DASHBOARD__FAVORITES:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setPageRoutine = createFavoritesRoutine('SET_PAGE');
export const toggleFavoriteBuildingRoutine = createFavoritesRoutine('TOGGLE_FAVORITE_BUILDING');
export const fetchFavoriteBuildingsRoutine = createFavoritesRoutine('FETCH_FAVORITE_BUILDINGS');
