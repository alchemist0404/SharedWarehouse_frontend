import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { cancelBookingRoutine, fetchActiveBookingsRoutine, setExpandedBookingRoutine } from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { toastr } from 'react-redux-toastr';
import bookingsService from '@screens/NeedsDashboard/DropOffAndPickUp/service/bookings.service';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { IBookingCancellationRequest } from '@screens/NeedsDashboard/DropOffAndPickUp/model/BookingCancellationRequest';
import { extractActiveBookings } from '@screens/NeedsDashboard/DropOffAndPickUp/reducers';

function* tryFetchActiveBookings({ payload }: PayloadAction<IPageRequest>) {
  try {
    const resp = yield call(bookingsService.fetchActiveBookings, payload);
    yield put(fetchActiveBookingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load bookings', e?.message);
    yield put(fetchActiveBookingsRoutine.failure(e?.message));
  }
}

function* tryCancelBooking({ payload }: PayloadAction<IBookingCancellationRequest>) {
  try {
    yield call(bookingsService.cancelBooking, payload);
    yield put(cancelBookingRoutine.success(payload));
    const bookings = yield select(extractActiveBookings);
    const booking = bookings.find(b => b.booking.id === payload.bookingId);
    yield put(setExpandedBookingRoutine.fulfill(booking));
    toastr.success('Success', 'The ending date has been successfully updated');
  } catch (e) {
    toastr.error('Can\'t cancel booking', e?.message);
    yield put(cancelBookingRoutine.failure(e?.message));
  }
}

export default function* bookingsTableSagas() {
  yield all([
    yield takeEvery(fetchActiveBookingsRoutine.TRIGGER, tryFetchActiveBookings),
    yield takeEvery(cancelBookingRoutine.TRIGGER, tryCancelBooking)
  ]);
}
