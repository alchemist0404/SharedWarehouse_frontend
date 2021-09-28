import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import bankingService from '@services/banking.service';
import { loadBankingDataRoutine, updateBankingDataRoutine } from '@screens/HavesDashboard/FinancialBanking/routines';
import { toastr } from 'react-redux-toastr';

export const tryLoadBankingData = (routine: Routine) => function* loadFinancialBanking() {
  try {
    const resp = yield call(bankingService.loadBankingData);
    yield put(routine.success(resp || {}));
  } catch (e) {
    toastr.error('Error', 'Failed to load banking details');
    yield put(routine.failure(e?.message));
  }
};

export const tryUpdateBankingData = (routine: Routine) => function* updateFinancialBanking({ payload }: Routine<any>) {
  try {
    const resp = yield call(bankingService.updateBankingData, payload);
    yield put(routine.success(resp));
    toastr.success('Success', 'Banking details saved!');
  } catch (e) {
    toastr.error('Error', 'Failed to save banking details');
    yield put(routine.failure(e?.message));
  }
};

export default function* financialBankingPageSagas() {
  yield all([
    yield takeEvery(loadBankingDataRoutine.TRIGGER, tryLoadBankingData(loadBankingDataRoutine)),
    yield takeEvery(updateBankingDataRoutine.TRIGGER, tryUpdateBankingData(updateBankingDataRoutine))
  ]);
}
