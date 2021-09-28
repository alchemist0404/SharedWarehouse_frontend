import { all } from 'redux-saga/effects';
import buildingsPageSagas from '@screens/HavesDashboard/Buildings/containers/BuildingsPage/sagas';

export default function* buildingsSagas() {
  yield all([
    buildingsPageSagas()
  ]);
}
