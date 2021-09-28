import { combineReducers } from 'redux';
import { browseSpacesReducer } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';
import { searchBarReducer } from '@screens/BrowseSpaces/containers/SearchBar/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
import { performSearchRoutine } from '@screens/BrowseSpaces/routines';
import { RootState } from '@root/store';

const requests = combineReducers({
  searchRequest: reducerCreator([performSearchRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  browsing: browseSpacesReducer,
  query: searchBarReducer
});

const browsing = (state: RootState) => state.spaceBrowse.browsing;
const query = (state: RootState) => state.spaceBrowse.query;
const reqs = (state: RootState) => state.spaceBrowse.requests;

export const extractResults = state => browsing(state).results;
export const extractPageLayout = state => browsing(state).layout;
export const extractTotalPages = state => browsing(state).totalPages;
export const extractTotalResults = state => browsing(state).totalResults;

export const extractPageSize = state => query(state).size;
export const extractCurrentPage = state => query(state).page;
export const extractQuery = state => query(state);

export const extractSearchLoading = state => reqs(state).searchRequest.loading;
export const extractSearchError = state => reqs(state).searchRequest.error;
