import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { buildingsReducer } from '@screens/HavesDashboard/Buildings/containers/BuildingsPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  createBuildingRoutine,
  fetchAllTagsRoutine,
  fetchBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Buildings/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  fetchAllTagsRequest: reducerCreator([fetchAllTagsRoutine.TRIGGER]),
  createBuildingRequest: reducerCreator([createBuildingRoutine.TRIGGER]),
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  fetchBuildingsRequest: reducerCreator([fetchBuildingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: buildingsReducer
});

const reqs = (state: RootState) => state.havesDashboard.buildings.requests;
const data = (state: RootState) => state.havesDashboard.buildings.data;

export const extractBuildings = state => data(state).items;
export const extractPage = state => data(state).page;
export const extractPageSize = state => data(state).pageSize;
export const extractTotalPages = state => data(state).totalPages;
export const extractTags = state => data(state).tags;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchAllTagsLoading = state => reqs(state).fetchAllTagsRequest.loading;
export const extractFetchAllTagsError = state => reqs(state).fetchAllTagsRequest.error;
export const extractCreateBuildingLoading = state => reqs(state).createBuildingRequest.loading;
export const extractCreateBuildingError = state => reqs(state).createBuildingRequest.error;
export const extractToggleFavoriteBuildingLoading = state => reqs(state).toggleFavoriteBuildingRequest.loading;
export const extractToggleFavoriteBuildingError = state => reqs(state).toggleFavoriteBuildingRequest.error;
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractFetchBuildingsLoading = state => reqs(state).fetchBuildingsRequest.loading;
export const extractFetchBuildingsError = state => reqs(state).fetchBuildingsRequest.error;
