import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchUserRoutine, registerRoutine } from '@screens/Authorization/routines';
import * as authService from '../../services/auth.service';
import { Routine } from 'redux-saga-routines';
import * as tokenService from '@screens/Authorization/services/tokens.service';
import { toastr } from 'react-redux-toastr';

function* tryRegister({ payload }: Routine<any>) {
  try {
    const response = yield call(authService.register, payload);
    tokenService.setTokens(response.accessToken, response.refreshToken);
    yield put(registerRoutine.success());
    yield put(fetchUserRoutine.trigger());
  } catch (error) {
    yield put(registerRoutine.failure(error?.message));
    toastr.error('Failed to register!', error?.message);
  }
}

export default function* registerPageSagas() {
  yield all([
    yield takeEvery(registerRoutine.TRIGGER, tryRegister)
  ]);
}
