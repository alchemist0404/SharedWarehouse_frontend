import { all, takeEvery } from 'redux-saga/effects';
import {
  fetchFavoriteBuildingsRoutine,
  toggleFavoriteBuildingRoutine
} from '@screens/HavesDashboard/Favorites/routines';
import { tryFetchFavoriteBuildings } from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage/sagas';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export default function* favoritesPageSagas() {
  yield all([
    yield takeEvery(fetchFavoriteBuildingsRoutine.TRIGGER, tryFetchFavoriteBuildings(fetchFavoriteBuildingsRoutine)),
    yield takeEvery(toggleFavoriteBuildingRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteBuildingRoutine))
  ]);
}
