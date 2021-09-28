import { Routine } from 'redux-saga-routines';
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Dashboard/routines';
import { ITransaction } from '@screens/UserMain/model/Transaction';
import { favFailure, favSuccess, favTriggered } from '@screens/BrowseSpaces/containers/BrowseSpacesPage/reducer';
import { IResultBuildingItem } from '@screens/BrowseSpaces/model/ResultItem';

export interface IDashboardReducerState {
  buildings: IResultBuildingItem[];
  transactions: ITransaction[];
  moreBuildings: boolean;
  moreTransactions: boolean;
}

const initialState: IDashboardReducerState = {
  buildings: [],
  transactions: [],
  moreBuildings: false,
  moreTransactions: false
};

export const dashboardReducer = (state = initialState, action: Routine<any>) => {
  const { type, payload } = action;
  switch (type) {
    case fetchMyBuildingsRoutine.SUCCESS:
      return {
        ...state,
        buildings: payload.items,
        moreBuildings: payload.totalPages > 1
      };
    case fetchMyTransactionsRoutine.SUCCESS:
      return {
        ...state,
        transactions: payload.items,
        moreTransactions: payload.totalPages > 1
      };
    case toggleFavoriteBuildingRoutine.TRIGGER:
      return {
        ...state,
        buildings: favTriggered(state.buildings, payload)
      };
    case toggleFavoriteBuildingRoutine.SUCCESS:
      return {
        ...state,
        buildings: favSuccess(state.buildings, payload)
      };
    case toggleFavoriteBuildingRoutine.FAILURE:
      return {
        ...state,
        buildings: favFailure(state.buildings, payload.id)
      };
    default:
      return state;
  }
};
