import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  loadProfileDetailsRoutine,
  saveProfileDetailsRoutine,
  uploadAvatarRoutine
} from '@screens/NeedsDashboard/Account/routines';
import profileService from '@services/profile.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';
import { syncUserRoutine } from '@screens/Authorization/routines';

export const tryLoadProfileDetails = (routine: Routine) => function* loadProfile() {
  try {
    const resp = yield call(profileService.loadProfileData);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to load profile info', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const trySaveProfileDetails = (routine: Routine, updateUserRoutine: Routine) => function* saveProfile({ payload }: Routine<any>) {
  try {
    const resp = yield call(profileService.saveProfileData, payload);
    yield put(routine.success(resp));
    toastr.success('Success', 'Profile saved!');
    yield put(updateUserRoutine.trigger());
  } catch (e) {
    toastr.error('Failed to save profile info', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const tryToUploadAvatar = (routine: Routine) => function* uploadAvatar({ payload }: Routine<any>) {
  try {
    const formData = new FormData();
    formData.append('avatarFile', payload, payload.name);
    const resp = yield call(profileService.uploadAvatar, formData);
    yield put(routine.success(resp));
    toastr.success('Success', 'Avatar uploaded!');
  } catch (e) {
    toastr.error('Failed to upload avatar', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export default function* accountPageSagas() {
  yield all([
    yield takeEvery(loadProfileDetailsRoutine.TRIGGER, tryLoadProfileDetails(loadProfileDetailsRoutine)),
    yield takeEvery(
      saveProfileDetailsRoutine.TRIGGER, trySaveProfileDetails(saveProfileDetailsRoutine, syncUserRoutine)
    ),
    yield takeEvery(uploadAvatarRoutine.TRIGGER, tryToUploadAvatar(uploadAvatarRoutine))
  ]);
}
