import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchTransactionsRoutine } from '@screens/NeedsDashboard/Transactions/routines';
import transactionsService from '@services/transactions.service';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';

export const tryFetchTransactions = (routine: Routine) => function* fetchTransactions({ payload }: Routine<any>) {
  try {
    const resp = yield call(transactionsService.fetchTransactions, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to fetch transactions', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export default function* transactionsPageSagas() {
  yield all([
    yield takeEvery(fetchTransactionsRoutine.TRIGGER, tryFetchTransactions(fetchTransactionsRoutine))
  ]);
}
