import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';
import * as service from '@screens/Authorization/services/email_verification.service';
import { resendEmailRoutine, verifyEmailActivationRoutine } from '@screens/Authorization/routines';

function* trySendEmail() {
  try {
    yield call(service.resendEmail);
    yield put(resendEmailRoutine.success());
    toastr.success('Activation email was sent!', 'Check your inbox');
  } catch (error) {
    yield put(resendEmailRoutine.failure(error?.message));
  }
}

function* tryVerifyEmailActivation({ payload }: Routine<any>) {
  try {
    yield call(service.verifyEmailActivation, payload);
    yield put(verifyEmailActivationRoutine.success());
  } catch (e) {
    yield put(verifyEmailActivationRoutine.failure(e?.message));
  }
}

export default function* emailActivationSagas() {
  yield all([
    yield takeEvery(resendEmailRoutine.TRIGGER, trySendEmail),
    yield takeEvery(verifyEmailActivationRoutine.TRIGGER, tryVerifyEmailActivation)
  ]);
}
