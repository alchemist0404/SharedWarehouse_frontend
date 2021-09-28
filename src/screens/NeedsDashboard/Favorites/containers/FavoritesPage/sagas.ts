import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchFavoriteBuildingsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Favorites/routines';
import { fetchFavoriteBuildings } from '@screens/NeedsDashboard/Favorites/service/building.service';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export const tryFetchFavoriteBuildings = (routine: Routine) => function* fetchFavsSaga({ payload }: Routine<any>) {
  try {
    const resp = yield call(fetchFavoriteBuildings, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load favorite spaces', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export default function* favoritesPageSagas() {
  yield all([
    yield takeEvery(fetchFavoriteBuildingsRoutine.TRIGGER, tryFetchFavoriteBuildings(fetchFavoriteBuildingsRoutine)),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
