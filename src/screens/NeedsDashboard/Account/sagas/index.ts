import { all } from 'redux-saga/effects';
import accountPageSagas from '@screens/NeedsDashboard/Account/containers/AccountPage/sagas';

export default function* accountSagas() {
  yield all([
    accountPageSagas()
  ]);
}
