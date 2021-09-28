import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchTransactionsRoutine } from '@screens/BookingCheckout/routines';
import { PayloadAction } from '@reduxjs/toolkit';
import bookingTransactionsService from '@screens/BookingCheckout/services/booking.transactions.service';
import { toastr } from 'react-redux-toastr';
import { IFetchTransactionsForBookingRequest } from '@screens/BookingCheckout/containers/BookingDetailsPage/TransactionsBlock';

function* tryFetchTransactionsForBooking({ payload }: PayloadAction<IFetchTransactionsForBookingRequest>) {
  try {
    const resp = yield call(bookingTransactionsService.fetchBookingTransactions, payload);
    yield put(fetchTransactionsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t fetch transactions', e?.message);
    yield put(fetchTransactionsRoutine.failure(e?.message));
  }
}

export default function* bookingDetailsPageSagas() {
  yield all([
    yield takeEvery(fetchTransactionsRoutine.TRIGGER, tryFetchTransactionsForBooking)
  ]);
}
