import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  createBuildingRoutine,
  fetchAllTagsRoutine,
  fetchBuildingsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Buildings/routines';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';
import { Routine } from 'redux-saga-routines';
import buildingsService from '@services/buildings.service';
import { toastr } from 'react-redux-toastr';
import { PayloadAction } from '@reduxjs/toolkit';
import { IBuildingForSave } from '@screens/BuildingEditor/model/BuildingForSave';
import { history } from '@helpers/history.helper';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import tagsService from '@screens/BuildingEditor/services/tags.service';

function* tryFetchBuildings({ payload }: Routine<any>) {
  try {
    const resp = yield call(buildingsService.fetchOwnedBuildings, payload);
    yield put(fetchBuildingsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load buildings', e?.message);
    yield put(fetchBuildingsRoutine.failure(e?.message));
  }
}

function* tryCreateBuilding({ payload }: PayloadAction<IBuildingForSave>) {
  try {
    const respId = yield call(buildingsService.createBuilding, payload);
    yield put(createBuildingRoutine.success());
    toastr.success('Success', 'The building has been created!');
    history.push(ENDPOINTS.BUILDING_EDITOR(respId));
  } catch (e) {
    toastr.error('Can\'t create the building', e?.message);
    yield put(createBuildingRoutine.failure(e?.message));
  }
}

function* tryFetchAllTags() {
  try {
    const resp = yield call(tagsService.fetchAllTags);
    yield put(fetchAllTagsRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load tags', e?.message);
    yield put(fetchAllTagsRoutine.failure(e?.message));
  }
}

export default function* buildingsPageSagas() {
  yield all([
    yield takeEvery(fetchBuildingsRoutine.TRIGGER, tryFetchBuildings),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine)),
    yield takeEvery(createBuildingRoutine.TRIGGER, tryCreateBuilding),
    yield takeEvery(fetchAllTagsRoutine.TRIGGER, tryFetchAllTags)
  ]);
}
