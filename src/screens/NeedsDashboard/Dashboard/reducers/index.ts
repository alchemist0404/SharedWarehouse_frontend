import { combineReducers } from 'redux';
import { reducerCreator } from '@helpers/reducer.helper';
import { dashboardReducer } from '@screens/NeedsDashboard/Dashboard/containers/DashboardPage/reducer';
import { RootState } from '@root/store';
/* PlopJS import placeholder. Do not remove */
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Dashboard/routines';

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

const reqs = (state: RootState) => state.needsDashboard.dashboard.requests;
const data = (state: RootState) => state.needsDashboard.dashboard.data;

export const extractMyBuildings = state => data(state).buildings;
export const extractMyTransactions = state => data(state).transactions;
export const extractMoreBuildings = state => data(state).moreBuildings;
export const extractMoreTransactions = state => data(state).moreTransactions;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractFetchMyTransactionsLoading = state => reqs(state).fetchMyTransactionsRequest.loading;
export const extractFetchMyBuildingsLoading = state => reqs(state).fetchMyBuildingsRequest.loading;
