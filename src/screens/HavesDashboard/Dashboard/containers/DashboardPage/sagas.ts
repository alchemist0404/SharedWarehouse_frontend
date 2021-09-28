import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchMyBuildingsRoutine,
  fetchMyTransactionsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Dashboard/routines';
import { toastr } from 'react-redux-toastr';
import buildingsService from '@services/buildings.service';
import transactionsService from '@services/transactions.service';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

function* tryFetchMyBuildings() {
  try {
    const resp = yield call(buildingsService.fetchOwnedBuildings, { page: 1, size: 7 });
    yield put(fetchMyBuildingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load spaces', e?.message);
    yield put(fetchMyBuildingsRoutine.failure(e?.message));
  }
}

function* tryFetchMyTransactions() {
  try {
    const resp = yield call(transactionsService.fetchTransactions, { page: 1, size: 7 });
    yield put(fetchMyTransactionsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load transactions', e?.message);
    yield put(fetchMyTransactionsRoutine.failure(e?.message));
  }
}

export default function* dashboardPageSagas() {
  yield all([
    yield takeEvery(fetchMyBuildingsRoutine.TRIGGER, tryFetchMyBuildings),
    yield takeEvery(fetchMyTransactionsRoutine.TRIGGER, tryFetchMyTransactions),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
