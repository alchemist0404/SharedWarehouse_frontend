import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { bookedSpacesReducer } from '@screens/NeedsDashboard/BookedSpaces/containers/BookedSpacesPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchBookedBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BookedSpaces/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  fetchMyBookedSpacesRequest: reducerCreator([fetchBookedBuildingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: bookedSpacesReducer
});

const reqs = (state: RootState) => state.needsDashboard.bookedSpaces.requests;
const data = (state: RootState) => state.needsDashboard.bookedSpaces.data;

export const extractBuildings = state => data(state).items;
export const extractPage = state => data(state).page;
export const extractPageSize = state => data(state).pageSize;
export const extractTotalPages = state => data(state).totalPages;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractFetchMyBookedSpacesLoading = state => reqs(state).fetchMyBookedSpacesRequest.loading;
export const extractFetchMyBookedSpacesError = state => reqs(state).fetchMyBookedSpacesRequest.error;
