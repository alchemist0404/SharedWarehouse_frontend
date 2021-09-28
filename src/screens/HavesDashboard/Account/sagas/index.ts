import { all } from 'redux-saga/effects';
import accountPageSagas from '@screens/HavesDashboard/Account/containers/AccountPage/sagas';

export default function* accountSagas() {
  yield all([
    accountPageSagas()
  ]);
}
