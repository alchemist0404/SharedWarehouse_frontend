import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { dashboardReducer } from '@screens/AdminDashboard/Dashboard/containers/DashboardPage/reducer';
/* PlopJS import placeholder. Do not remove */

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
});

export default combineReducers({
  requests,
  data: dashboardReducer
});

const reqs = (state: RootState) => state.adminDashboard.dashboard.requests;
const data = (state: RootState) => state.adminDashboard.dashboard.data;

/* PlopJS request_extractor placeholder. Do not remove */
