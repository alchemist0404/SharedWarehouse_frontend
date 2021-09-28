import { all } from 'redux-saga/effects';
import buildingEditorPageSagas from '@screens/BuildingEditor/containers/BuildingEditorPage/sagas';

export default function* buildingEditorSagas() {
  yield all([
    buildingEditorPageSagas()
  ]);
}
