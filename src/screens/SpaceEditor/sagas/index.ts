import { all } from 'redux-saga/effects';
import spaceEditorPageSagas from '@screens/SpaceEditor/containers/SpaceEditorPage/sagas';

export default function* spaceEditorSagas() {
  yield all([
    spaceEditorPageSagas()
  ]);
}
