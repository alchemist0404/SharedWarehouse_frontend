/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createFavoritesRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__FAVORITES:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchFavoriteBuildingsRoutine = createFavoritesRoutine('FETCH_FAVORITE_BUILDINGS');
export const setPageRoutine = createFavoritesRoutine('SET_PAGE');
export const toggleFavoriteBuildingRoutine = createFavoritesRoutine('TOGGLE_FAVORITE_BUILDING');
