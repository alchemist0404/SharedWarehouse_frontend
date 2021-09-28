/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

const createBookedSpacesRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`NEEDS_DASHBOARD__BOOKED_SPACES:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const setPageRoutine = createBookedSpacesRoutine('SET_PAGE');
export const toggleFavoriteBuildingRoutine = createBookedSpacesRoutine('TOGGLE_FAVORITE_BUILDING');
export const fetchBookedBuildingsRoutine = createBookedSpacesRoutine<IPageRequest>('FETCH_BOOKED_BUILDINGS');
