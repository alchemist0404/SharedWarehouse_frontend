import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchUserRoutine, logOutRoutine, syncUserRoutine } from '@screens/Authorization/routines';
import * as authService from '../../services/auth.service';
import { logout } from '../../services/auth.service';
import { tokensStored } from '@screens/Authorization/services/tokens.service';
import { history } from '@helpers/history.helper';
import { ENDPOINTS } from '@containers/Routing/endpoints';

function* tryFetchUser() {
  try {
    if (tokensStored()) {
      const response = yield call(authService.userInfo);
      yield put(fetchUserRoutine.success(response));
    } else {
      yield put(fetchUserRoutine.success({}));
    }
  } catch (error) {
    yield put(fetchUserRoutine.failure(error?.message));
    toastr.error('Cannot load user information', error?.message);
    yield put(logOutRoutine.trigger());
  }
}

function* trySyncUser() {
  try {
    const response = yield call(authService.userInfo);
    yield put(syncUserRoutine.success(response));
  } catch (error) {
    yield put(syncUserRoutine.failure(error?.message));
    toastr.error('Cannot load user information', error?.message);
    yield put(logOutRoutine.trigger());
  }
}

function* tryLogOut() {
  try {
    yield call(logout);
    yield put(logOutRoutine.success());
    history.push(ENDPOINTS.LOGIN);
  } catch (error) {
    yield put(logOutRoutine.failure(error?.message));
  }
}

export default function* authorizationSagas() {
  yield all([
    yield takeEvery(fetchUserRoutine.TRIGGER, tryFetchUser),
    yield takeEvery(syncUserRoutine.TRIGGER, trySyncUser),
    yield takeEvery(logOutRoutine.TRIGGER, tryLogOut)
  ]);
}
