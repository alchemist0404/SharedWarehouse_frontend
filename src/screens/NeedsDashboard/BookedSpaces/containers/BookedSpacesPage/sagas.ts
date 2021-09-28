import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchBookedBuildingsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/BookedSpaces/routines';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';
import buildingsService from '@services/buildings.service';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

function* tryFetchBookedBuildings({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingsService.fetchBookedBuildings, payload);
    yield put(fetchBookedBuildingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load spaces', e?.message);
    yield put(fetchBookedBuildingsRoutine.failure(e?.message));
  }
}

export default function* bookedSpacesPageSagas() {
  yield all([
    yield takeEvery(fetchBookedBuildingsRoutine.TRIGGER, tryFetchBookedBuildings),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
