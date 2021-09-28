import { Routine } from 'redux-saga-routines';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { sendResetPasswordRoutine } from '@screens/Authorization/routines';
import { toastr } from 'react-redux-toastr';
import { sendResetPasswordMail } from '@screens/Authorization/services/reset_password.service';

function* trySendResetPasswordMail({ payload }: Routine<any>) {
  try {
    yield call(sendResetPasswordMail, payload);
    yield put(sendResetPasswordRoutine.success());
    toastr.success('Message sent', 'Please check your inbox');
  } catch (e) {
    yield put(sendResetPasswordRoutine.failure(e?.message));
  }
}

export default function* forgottenPasswordPageSagas() {
  yield all([
    yield takeEvery(sendResetPasswordRoutine.TRIGGER, trySendResetPasswordMail)
  ]);
}
