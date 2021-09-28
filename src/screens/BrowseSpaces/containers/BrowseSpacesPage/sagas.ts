import { all, takeEvery } from 'redux-saga/effects';
import { toggleFavoriteBuildingRoutine } from '@screens/BrowseSpaces/routines';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export default function* spacesSagas() {
  yield all([
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
