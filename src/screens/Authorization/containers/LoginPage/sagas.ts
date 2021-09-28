import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { fetchUserRoutine, logInRoutine } from '@screens/Authorization/routines';
import * as authService from '../../services/auth.service';
import * as tokenService from '../../services/tokens.service';
import { Routine } from 'redux-saga-routines';

function* tryLogin({ payload }: Routine<any>) {
  try {
    const response = yield call(authService.login, payload);
    tokenService.setTokens(response.accessToken, response.refreshToken);
    yield put(logInRoutine.success());
    yield put(fetchUserRoutine.trigger());
  } catch (error) {
    yield put(logInRoutine.failure(error?.message));
    toastr.error('Failed to log in', error?.message);
  }
}

export default function* loginPageSagas() {
  yield all([
    yield takeEvery(logInRoutine.TRIGGER, tryLogin)
  ]);
}
