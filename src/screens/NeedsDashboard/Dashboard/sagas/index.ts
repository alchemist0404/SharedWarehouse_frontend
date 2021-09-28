import { all } from 'redux-saga/effects';
import dashboardPageSagas from '@screens/NeedsDashboard/Dashboard/containers/DashboardPage/sagas';

export default function* dashboardSagas() {
  yield all([
    dashboardPageSagas()
  ]);
}
