import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import * as buildingService from '@screens/BuildingDetails/services/building.service';
import * as bookingService from '@screens/BuildingDetails/services/booking.service';
import {
  bookSpacesRoutine,
  fetchBuildingDetailsRoutine,
  fetchSpaceAvailabilityRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/BuildingDetails/routines';
import { toastr } from 'react-redux-toastr';
import { history } from '@helpers/history.helper';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export const tryFetchBuildingDetails = (routine: Routine) => function* fetchBuildingDetails({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingService.fetchBuilding, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to load building details', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const tryFetchSpaceAvailability = (routine: Routine) => function* fetchSpaceAvailability({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingService.fetchSpaceAvailability, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to fetch spaces', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const tryBookSpaces = (routine: Routine) => function* bookSpaces({ payload }: Routine<any>) {
  try {
    const resp = yield call(bookingService.bookSpaces, payload);
    yield put(routine.success(resp));
    const { location: { pathname, search } } = history;
    history.push(`/booking/${resp}`, { prevPath: `${pathname}`, search });
  } catch (e) {
    toastr.error('Failed to book', e?.message, e?.data);
    yield put(routine.failure(e));
  }
};

export default function* buildingDetailsPageSagas() {
  yield all([
    yield takeEvery(fetchBuildingDetailsRoutine.TRIGGER, tryFetchBuildingDetails(fetchBuildingDetailsRoutine)),
    yield takeEvery(fetchSpaceAvailabilityRoutine.TRIGGER, tryFetchSpaceAvailability(fetchSpaceAvailabilityRoutine)),
    yield takeEvery(bookSpacesRoutine.TRIGGER, tryBookSpaces(bookSpacesRoutine)),
    yield takeEvery(toggleFavoriteBuildingRoutine, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
