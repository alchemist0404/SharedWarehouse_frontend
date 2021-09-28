import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import membersSummarySagas from '@screens/AdminDashboard/MembersSummary/sagas';
import dashboardSagas from '@screens/AdminDashboard/Dashboard/sagas';

export default function* adminDashboardSagas() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    membersSummarySagas(),
    dashboardSagas(),
  ]);
}
