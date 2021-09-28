import { all, takeEvery } from 'redux-saga/effects';
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/HavesDashboard/Account/routines';
import {
  tryLoadProfileDetails,
  trySaveProfileDetails,
  tryToUploadAvatar
} from '@screens/NeedsDashboard/Account/containers/AccountPage/sagas';
import { syncUserRoutine } from '@screens/Authorization/routines';

export default function* accountPageSagas() {
  yield all([
    yield takeEvery(loadProfileDetailsRoutine.TRIGGER, tryLoadProfileDetails(loadProfileDetailsRoutine)),
    yield takeEvery(
      saveProfileDetailsRoutine.TRIGGER, trySaveProfileDetails(saveProfileDetailsRoutine, syncUserRoutine)
    ),
    yield takeEvery(uploadAvatarRoutine.TRIGGER, tryToUploadAvatar(uploadAvatarRoutine))
  ]);
}
