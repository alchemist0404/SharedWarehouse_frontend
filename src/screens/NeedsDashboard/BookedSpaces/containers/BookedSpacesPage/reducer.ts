import { Routine } from 'redux-saga-routines';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import {
  fetchBookedBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BookedSpaces/routines';
import { favFailure, favSuccess, favTriggered } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';
import { IBuildingSearchResult } from '@screens/BrowseSpaces/model/BuildingSearchResult';
import { getInitialPageableState } from '@models/domain/PageableReducerState';

export const bookedSpacesReducer = (state = getInitialPageableState<IResultBuildingItem>(), action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case fetchBookedBuildingsRoutine.SUCCESS:
      const payloadOfSearch = (payload as IBuildingSearchResult);
      return {
        ...state,
        items: payloadOfSearch.items,
        totalPages: payloadOfSearch.totalPages,
        totalResults: payloadOfSearch.totalResults
      };
    case setPageRoutine.FULFILL:
      return {
        ...state,
        page: payload
      };
    case toggleFavoriteBuildingRoutine.TRIGGER:
      return {
        ...state,
        items: favTriggered(state.items, payload)
      };
    case toggleFavoriteBuildingRoutine.SUCCESS:
      return {
        ...state,
        items: favSuccess(state.items, payload)
      };
    case toggleFavoriteBuildingRoutine.FAILURE:
      return {
        ...state,
        items: favFailure(state.items, payload)
      };
    default:
      return state;
  }
};
