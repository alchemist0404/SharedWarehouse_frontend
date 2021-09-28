import { all } from 'redux-saga/effects';
import buildingDetailsPageSagas from '@screens/BuildingDetails/containers/BuildingDetailsPage/sagas';

export default function* buildingDetailsSagas() {
  yield all([
    buildingDetailsPageSagas()
  ]);
}
