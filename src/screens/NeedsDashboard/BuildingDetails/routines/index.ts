import { createRoutine } from 'redux-saga-routines';

const createBuildingDetailsRoutine = actionName => createRoutine(`NEEDS_DASHBOARD__BUILDING_DETAILS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const toggleFavoriteBuildingRoutine = createBuildingDetailsRoutine('TOGGLE_FAVORITE_BUILDING');
export const requestBookingRoutine = createBuildingDetailsRoutine('REQUEST_BOOKING');
export const fetchSpaceAvailabilityRoutine = createBuildingDetailsRoutine('FETCH_SPACE_AVAILABILITY');
export const fetchBuildingDetailsRoutine = createBuildingDetailsRoutine('FETCH_BUILDING_DETAILS');
