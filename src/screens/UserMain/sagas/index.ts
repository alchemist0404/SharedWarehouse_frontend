import { all } from 'redux-saga/effects';
import userMainPageSagas from '@screens/UserMain/containers/UserMainPage/sagas';

export default function* userMainSagas() {
  yield all([
    userMainPageSagas()
  ]);
}
