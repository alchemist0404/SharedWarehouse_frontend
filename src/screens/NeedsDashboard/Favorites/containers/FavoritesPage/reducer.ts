import { Routine } from 'redux-saga-routines';
import {
  fetchFavoriteBuildingsRoutine,
  setPageRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Favorites/routines';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';
import { getInitialPageableState } from '@models/domain/PageableReducerState';
import { favFailure, favSuccess, favTriggered } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';

const initialData = { ...getInitialPageableState<IResultBuildingItem>(), pageSize: 8 };
export const tweakPageOnReduce = (oldPage, newTotalPages) => {
  if (newTotalPages === 0) return 1;
  return (oldPage > newTotalPages ? newTotalPages : oldPage);
};

export const favoritesReducer = (state = initialData, action: Routine<any>) => {
  const { payload, type } = action;
  switch (type) {
    case fetchFavoriteBuildingsRoutine.SUCCESS:
      return {
        ...state,
        items: payload.items,
        totalPages: payload.totalPages,
        totalResults: payload.totalResults,
        page: tweakPageOnReduce(state.page, payload.totalPages)
      };
    case setPageRoutine.FULFILL:
      return {
        ...state,
        page: payload
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
    case toggleFavoriteBuildingRoutine.TRIGGER:
      return {
        ...state,
        items: favTriggered(state.items, payload)
      };
    default:
      return state;
  }
};
