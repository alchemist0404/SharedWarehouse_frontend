import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  completeScheduleRoutine,
  fetchActiveBookingsRoutine,
  fetchSchedulesRoutine,
  reviewScheduleRoutine,
  setBookingNeedsReviewRoutine
} from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { PayloadAction } from '@reduxjs/toolkit';
import bookingsService from '@screens/HavesDashboard/DropOffAndPickUp/services/bookings.service';
import { toastr } from 'react-redux-toastr';
import { IScheduleReviewRequest } from '@screens/HavesDashboard/DropOffAndPickUp/model/ScheduleReviewRequest';
import schedulesService from '@screens/HavesDashboard/DropOffAndPickUp/services/schedule.service';
import { IScheduleResponseDto } from '@screens/NeedsDashboard/DropOffAndPickUp/model/ScheduleResponse';

function* tryFetchActiveBookings({ payload }: PayloadAction<any>) {
  try {
    const resp = yield call(bookingsService.fetchActiveBookings, payload);
    yield put(fetchActiveBookingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load bookings', e?.message);
    yield put(fetchActiveBookingsRoutine.failure(e?.message));
  }
}

function* tryFetchSchedules({ payload }: PayloadAction<any>) {
  try {
    const resp = yield call(schedulesService.fetchSchedules, payload);
    yield put(fetchSchedulesRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load schedules', e?.message);
    yield put(fetchSchedulesRoutine.failure(e?.message));
  }
}

function* tryCompleteSchedule({ payload }: PayloadAction<IScheduleResponseDto>) {
  try {
    yield call(schedulesService.completeSchedule, payload.id);
    yield put(completeScheduleRoutine.success(payload));
    toastr.success('Success', 'The schedule has been marked as completed');
  } catch (e) {
    toastr.error('Unable to complete schedule', e?.message);
    yield put(completeScheduleRoutine.failure(e?.message));
  }
}

function* tryReviewSchedule({ payload }: PayloadAction<IScheduleReviewRequest>) {
  try {
    const { needs } = yield call(schedulesService.reviewSchedule, payload);
    yield put(reviewScheduleRoutine.success(payload));
    toastr.success('Success', 'The schedule has been updated');
    yield put(setBookingNeedsReviewRoutine.fulfill({ bookingId: payload.bookingId, needs }));
  } catch (e) {
    toastr.error('Can\'t make the action', e?.message);
    yield put(reviewScheduleRoutine.failure(e?.message));
  }
}

export default function* bookingModalSagas() {
  yield all([
    yield takeEvery(fetchActiveBookingsRoutine.TRIGGER, tryFetchActiveBookings),
    yield takeEvery(fetchSchedulesRoutine.TRIGGER, tryFetchSchedules),
    yield takeEvery(completeScheduleRoutine.TRIGGER, tryCompleteSchedule),
    yield takeEvery(reviewScheduleRoutine.TRIGGER, tryReviewSchedule)
  ]);
}
