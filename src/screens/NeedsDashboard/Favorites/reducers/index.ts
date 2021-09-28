import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { favoritesReducer } from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Favorites/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  setPageRequest: reducerCreator([setPageRoutine.TRIGGER]),
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  fetchFavoriteBuildingsRequest: reducerCreator([fetchFavoriteBuildingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: favoritesReducer
});

const reqs = (state: RootState) => state.needsDashboard.favorites.requests;
const data = (state: RootState) => state.needsDashboard.favorites.data;

export const extractBuildings = state => data(state).items;
export const extractCurrentPage = state => data(state).page;
export const extractTotalPages = state => data(state).totalPages;
export const extractPageSize = state => data(state).pageSize;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractSetPageLoading = state => reqs(state).setPageRequest.loading;
export const extractSetPageError = state => reqs(state).setPageRequest.error;
export const extractFetchFavoriteBuildingsLoading = state => reqs(state).fetchFavoriteBuildingsRequest.loading;
export const extractFetchFavoriteBuildingsError = state => reqs(state).fetchFavoriteBuildingsRequest.error;
