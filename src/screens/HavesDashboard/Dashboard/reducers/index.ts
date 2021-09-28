import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { dashboardReducer } from '@screens/HavesDashboard/Dashboard/containers/DashboardPage/reducer';
import { reducerCreator } from '@helpers/reducer.helper';
/* PlopJS import placeholder. Do not remove */
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Dashboard/routines';

// noinspection DuplicatedCode
const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  toggleFavoriteBuildingRequest: reducerCreator([toggleFavoriteBuildingRoutine.TRIGGER]),
  fetchMyTransactionsRequest: reducerCreator([fetchMyTransactionsRoutine.TRIGGER]),
  fetchMyBuildingsRequest: reducerCreator([fetchMyBuildingsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: dashboardReducer
});

const reqs = (state: RootState) => state.havesDashboard.dashboard.requests;
const data = (state: RootState) => state.havesDashboard.dashboard.data;

export const extractMyBuildings = state => data(state).buildings;
export const extractMyTransactions = state => data(state).transactions;
export const extractMoreBuildings = state => data(state).moreBuildings;
export const extractMoreTransactions = state => data(state).moreTransactions;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractToggleFavoriteBuildingLoading = state => reqs(state).toggleFavoriteBuildingRequest.loading;
export const extractFetchMyTransactionsLoading = state => reqs(state).fetchMyTransactionsRequest.loading;
export const extractFetchMyBuildingsLoading = state => reqs(state).fetchMyBuildingsRequest.loading;
