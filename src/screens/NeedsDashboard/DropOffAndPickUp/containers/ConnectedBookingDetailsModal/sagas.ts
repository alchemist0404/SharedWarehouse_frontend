import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchSchedulesRoutine,
  saveScheduleRoutine,
  cancelScheduleRoutine,
  setEditedScheduleRoutine
} from '@screens/NeedsDashboard/DropOffAndPickUp/routines';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';
import * as schedulesService from '../../service/schedules.service';

function* tryFetchSchedules({ payload }: Routine<any>) {
  try {
    const resp = yield call(schedulesService.fetchSchedules, payload);
    yield put(fetchSchedulesRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load schedules', e?.message);
    yield put(fetchSchedulesRoutine.failure(e?.message));
  }
}

function* trySaveSchedule({ payload }: Routine<any>) {
  try {
    const resp = yield call(schedulesService.saveSchedule, payload);
    yield put(saveScheduleRoutine.success(resp));
    toastr.success('Success', 'Schedule saved');
    yield put(setEditedScheduleRoutine.fulfill(undefined));
  } catch (e) {
    toastr.error('Can\'t save schedule', e?.message);
    yield put(saveScheduleRoutine.failure(e?.message));
  }
}

function* tryCancelSchedule({ payload }: Routine<any>) {
  try {
    const resp = yield call(schedulesService.cancelSchedule, payload);
    yield put(cancelScheduleRoutine.success(resp));
    toastr.success('Success', 'Schedule cancelled');
  } catch (e) {
    toastr.error('Can\'t cancel schedule', e?.message);
    yield put(cancelScheduleRoutine.failure(e?.message));
  }
}

export default function* bookingModalSagas() {
  yield all([
    yield takeEvery(fetchSchedulesRoutine.TRIGGER, tryFetchSchedules),
    yield takeEvery(saveScheduleRoutine.TRIGGER, trySaveSchedule),
    yield takeEvery(cancelScheduleRoutine.TRIGGER, tryCancelSchedule)
  ]);
}
