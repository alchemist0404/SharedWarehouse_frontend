import { all } from 'redux-saga/effects';
import dashboardPageSagas from '@screens/AdminDashboard/Dashboard/containers/DashboardPage/sagas';

export default function* dashboardSagas() {
  yield all([
    dashboardPageSagas()
  ]);
}
