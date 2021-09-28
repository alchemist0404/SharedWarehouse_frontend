import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { favoritesReducer } from '@screens/HavesDashboard/Favorites/containers/FavoritesPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Favorites/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  fetchFavoriteBuildingsRequest: reducerCreator([fetchFavoriteBuildingsRoutine.TRIGGER]),
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: favoritesReducer
});

const reqs = (state: RootState) => state.havesDashboard.favorites.requests;
const data = (state: RootState) => state.havesDashboard.favorites.data;

export const extractBuildings = state => data(state).items;
export const extractCurrentPage = state => data(state).page;
export const extractTotalPages = state => data(state).totalPages;
export const extractPageSize = state => data(state).pageSize;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchFavoriteBuildingsLoading = state => reqs(state).fetchFavoriteBuildingsRequest.loading;
export const extractFetchFavoriteBuildingsError = state => reqs(state).fetchFavoriteBuildingsRequest.error;
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractToggleFavoriteBuildingLoading = state => reqs(state).toggleFavoriteBuildingRequest.loading;
export const extractToggleFavoriteBuildingError = state => reqs(state).toggleFavoriteBuildingRequest.error;
