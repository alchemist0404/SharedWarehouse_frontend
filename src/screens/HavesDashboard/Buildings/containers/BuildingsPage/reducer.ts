import { Routine } from 'redux-saga-routines';
import { IBuildingSearchResult } from '@screens/BrowseSpaces/model/BuildingSearchResult';
import { favFailure, favSuccess, favTriggered } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';
import { getInitialPageableState, IPageableReducerState } from '@models/domain/PageableReducerState';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import {
  fetchAllTagsRoutine,
  fetchBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Buildings/routines';

export interface IBuildingsReducerState extends IPageableReducerState<IResultBuildingItem> {
  tags: string[];
}

const initialData = {
  ...getInitialPageableState<IResultBuildingItem>(),
  tags: []
};

export const buildingsReducer = (state: IBuildingsReducerState = initialData, action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case fetchBuildingsRoutine.SUCCESS:
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
    case fetchAllTagsRoutine.SUCCESS:
      return {
        ...state,
        tags: payload.map(t => t.name)
      };
    default:
      return state;
  }
};
