import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { PayloadAction } from '@reduxjs/toolkit';
import { IBookingCheckoutData } from '@screens/BookingCheckout/model/BookingCheckout';
import bookingDetailsService from '@screens/BookingCheckout/services/booking.details.service';
import { loadBookingDetailsRoutine } from '@screens/BookingCheckout/routines';

function* tryLoadBookingDetails({ payload }: PayloadAction<string>) {
  try {
    const resp: IBookingCheckoutData = yield call(bookingDetailsService.fetchBookingDetails, payload);
    yield put(loadBookingDetailsRoutine.success(resp));
  } catch (e) {
    toastr.error('Cannot load booking information', e?.message);
    yield put(loadBookingDetailsRoutine.failure(e?.message));
  }
}

export default function* bookingRootPageSagas() {
  yield all([
    yield takeEvery(loadBookingDetailsRoutine.TRIGGER, tryLoadBookingDetails)
  ]);
}
