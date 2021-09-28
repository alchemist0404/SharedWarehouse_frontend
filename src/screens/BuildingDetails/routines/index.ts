import { createRoutine } from 'redux-saga-routines';

const createBuildingDetailsRoutine = actionName => createRoutine(`BUILDING_DETAILS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const toggleFavoriteBuildingRoutine = createBuildingDetailsRoutine('TOGGLE_FAVORITE_BUILDING');
export const bookSpacesRoutine = createBuildingDetailsRoutine('BOOK_SPACES');
export const fetchBuildingDetailsRoutine = createBuildingDetailsRoutine('FETCH_DETAILS');
export const fetchSpaceAvailabilityRoutine = createBuildingDetailsRoutine('SPACE_AVAILABILITY');
