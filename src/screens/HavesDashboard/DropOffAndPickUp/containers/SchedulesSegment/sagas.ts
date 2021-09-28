import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import spacesService from '@screens/HavesDashboard/DropOffAndPickUp/services/space.service';
import { fetchAvailableAndScheduledSpaces, updateScheduleWithNewSpaces } from '@screens/HavesDashboard/DropOffAndPickUp/routines';
import { toastr } from 'react-redux-toastr';

function* tryFetchAvailableAndScheduledSpaces({ payload }: PayloadAction<string>) {
  try {
    const resp = yield call(spacesService.fetchAvailableAndScheduledSpaces, payload);
    yield put(fetchAvailableAndScheduledSpaces.success(resp));
  } catch (e) {
    toastr.error('Can\'t load spaces', e?.message);
    yield put(fetchAvailableAndScheduledSpaces.failure(e?.message));
  }
}

function* tryUpdateScheduleWithNewSpaces({ payload }: PayloadAction<{spacesIds: string[]; scheduleId: string}>) {
  try {
    const resp = yield call(spacesService.updateScheduleWithNewSpaces, payload);
    toastr.success('Success', 'Schedule successfully updated');
    yield put(updateScheduleWithNewSpaces.success(resp));
  } catch (e) {
    toastr.error('Can\'t update schedule', e?.message);
    yield put(updateScheduleWithNewSpaces.failure(e?.message));
  }
}

export default function* schedulesSegmentSagas() {
  yield all([
    yield takeEvery(fetchAvailableAndScheduledSpaces, tryFetchAvailableAndScheduledSpaces),
    yield takeEvery(updateScheduleWithNewSpaces, tryUpdateScheduleWithNewSpaces)
  ]);
}
