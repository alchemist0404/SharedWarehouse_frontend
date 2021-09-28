import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/NeedsDashboard/Dashboard/routines';
import transactionsService from '@services/transactions.service';
import buildingsService from '@services/buildings.service';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

function* tryFetchMyTransactions() {
  try {
    const resp = yield call(transactionsService.fetchTransactions, { page: 1, size: 5 });
    yield put(fetchMyTransactionsRoutine.success(resp));
  } catch (e) {
    yield put(fetchMyTransactionsRoutine.failure(e?.message));
  }
}

function* tryFetchMyBuildings() {
  try {
    const resp = yield call(buildingsService.fetchBookedBuildings, { page: 1, size: 7 });
    yield put(fetchMyBuildingsRoutine.success(resp));
  } catch (e) {
    yield put(fetchMyBuildingsRoutine.failure(e?.message));
  }
}

export default function* dashboardPageSagas() {
  yield all([
    takeEvery(fetchMyTransactionsRoutine.TRIGGER, tryFetchMyTransactions),
    takeEvery(fetchMyBuildingsRoutine.TRIGGER, tryFetchMyBuildings),
    takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
