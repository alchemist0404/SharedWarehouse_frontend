import { createRoutine } from 'redux-saga-routines';

const createSpaceBrowsingRoutine = actionName => createRoutine(`SPACE_BROWSING:${actionName}`);

export const setPageLayoutRoutine = createSpaceBrowsingRoutine('SET_PAGE_LAYOUT');
export const setPageSizeRoutine = createSpaceBrowsingRoutine('SET_PAGE_SIZE');
export const setPageIndexRoutine = createSpaceBrowsingRoutine('SET_PAGE_INDEX');
export const updateSearchQueryRoutine = createSpaceBrowsingRoutine('UPDATE_SEARCH_QUERY');
export const clearFiltersRoutine = createSpaceBrowsingRoutine('CLEAR_FILTERS');
export const performSearchRoutine = createSpaceBrowsingRoutine('PERFORM_SEARCH');
export const toggleFavoriteBuildingRoutine = createSpaceBrowsingRoutine('TOGGLE_FAVORITE_BUILDING');
