import { PageLayout } from '@screens/BrowseSpaces/model/PageLayout';
import { Routine } from 'redux-saga-routines';
import {
  performSearchRoutine,
  setPageLayoutRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/BrowseSpaces/routines';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { IBuildingSearchResult } from '@screens/BrowseSpaces/model/BuildingSearchResult';

export interface IBrowsingSpacesReducerState {
  loading: boolean;
  layout: PageLayout;
  results: IResultBuildingItem[];
  totalPages: number;
  totalResults: number;
}

const initialState: IBrowsingSpacesReducerState = {
  loading: false,
  layout: PageLayout.LIST,
  results: [],
  totalPages: 1,
  totalResults: 0
};

export const favTriggered = (items: IResultBuildingItem[], id: string) => items.map(i => {
  if (i.id === id) {
    return {
      ...i,
      likeLoading: true
    };
  }
  return i;
});

export const favFailure = (items: IResultBuildingItem[], id: string) => items.map(i => {
  if (i.id === id) {
    return {
      ...i,
      likeLoading: false
    };
  }
  return i;
});

export const favSuccess = (items: IResultBuildingItem[], id: string) => items.map(i => {
  if (i.id === id) {
    return {
      ...i,
      liked: !i.liked,
      likeLoading: false
    };
  }
  return i;
});

export const browseSpacesReducer = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case performSearchRoutine.SUCCESS:
      const payload = (action.payload as IBuildingSearchResult);
      return {
        ...state,
        results: payload.items,
        totalPages: payload.totalPages,
        totalResults: payload.totalResults
      };
    case setPageLayoutRoutine.FULFILL:
      return {
        ...state,
        layout: action.payload
      };
    case toggleFavoriteBuildingRoutine.TRIGGER:
      return {
        ...state,
        results: favTriggered(state.results, action.payload)
      };
    case toggleFavoriteBuildingRoutine.FAILURE:
      return {
        ...state,
        results: favFailure(state.results, action.payload.id)
      };
    case toggleFavoriteBuildingRoutine.SUCCESS:
      return {
        ...state,
        results: favSuccess(state.results, action.payload)
      };
    default:
      return state;
  }
};
