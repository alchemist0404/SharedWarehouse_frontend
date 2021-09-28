import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchBookingsRoutine, fetchTransactionsRoutine } from '@screens/UserMain/routines';
import * as bookingService from '@screens/UserMain/services/booking.service';
import transactionService from '@services/transactions.service';

function* tryFetchBookings() {
  try {
    const resp = yield call(bookingService.fetchBookings, { page: 1, size: 200 });
    yield put(fetchBookingsRoutine.success(resp));
  } catch (e) {
    yield put(fetchBookingsRoutine.failure(e?.message));
  }
}

function* tryFetchTransactions() {
  try {
    const resp = yield call(transactionService.fetchTransactions, { page: 1, size: 200 });
    yield put(fetchTransactionsRoutine.success(resp));
  } catch (e) {
    yield put(fetchTransactionsRoutine.failure(e?.message));
  }
}

export default function* userMainPageSagas() {
  yield all([
    yield takeEvery(fetchBookingsRoutine.TRIGGER, tryFetchBookings),
    yield takeEvery(fetchTransactionsRoutine.TRIGGER, tryFetchTransactions)
  ]);
}
