/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';

const createBuildingsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`HAVES_DASHBOARD__BUILDINGS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const fetchAllTagsRoutine = createBuildingsRoutine('FETCH_ALL_TAGS');
export const createBuildingRoutine = createBuildingsRoutine('CREATE_BUILDING');
export const toggleFavoriteBuildingRoutine = createBuildingsRoutine('TOGGLE_FAVORITE_BUILDING');
export const setPageRoutine = createBuildingsRoutine('SET_PAGE');
export const fetchBuildingsRoutine = createBuildingsRoutine<IPageRequest>('FETCH_BUILDINGS');
