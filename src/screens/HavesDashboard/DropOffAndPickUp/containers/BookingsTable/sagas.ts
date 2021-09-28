import { PayloadAction } from '@reduxjs/toolkit';
import { IPageRequest } from '@screens/NeedsDashboard/BookedSpaces/model/PageableRequest';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import bookingsService from '@screens/HavesDashboard/DropOffAndPickUp/services/bookings.service';
import { fetchActiveBookingsRoutine } from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { toastr } from 'react-redux-toastr';

function* tryFetchActiveBookings({ payload }: PayloadAction<IPageRequest>) {
  try {
    const resp = yield call(bookingsService.fetchActiveBookings, payload);
    yield put(fetchActiveBookingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load bookings', e?.message);
    yield put(fetchActiveBookingsRoutine.failure(e?.message));
  }
}

export default function* dropOffAndPickUpPageSagas() {
  yield all([
    yield takeEvery(fetchActiveBookingsRoutine, tryFetchActiveBookings)
  ]);
}
