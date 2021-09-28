import { Routine } from 'redux-saga-routines';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { logInRoutine, resetPasswordRoutine } from '@screens/Authorization/routines';
import { toastr } from 'react-redux-toastr';
import { resetPassword } from '@screens/Authorization/services/reset_password.service';
import { history } from '@helpers/history.helper';
import { ENDPOINTS } from '@containers/Routing/endpoints';

function* tryResetPassword({ payload }: Routine<any>) {
  try {
    yield call(resetPassword, payload);
    yield put(resetPasswordRoutine.success());
    toastr.success('Success', 'New password has been set');
    yield put(logInRoutine.trigger({ email: payload.email, password: payload.password }));
    history.push(ENDPOINTS.ROOT);
  } catch (e) {
    yield put(resetPasswordRoutine.failure(e?.message));
    toastr.error('Failed to reset password', e?.message);
  }
}

export default function* resetPasswordPageSagas() {
  yield all([
    yield takeEvery(resetPasswordRoutine.TRIGGER, tryResetPassword)
  ]);
}
