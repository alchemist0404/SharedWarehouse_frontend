import { all } from 'redux-saga/effects';
import favoritesPageSagas from '@screens/HavesDashboard/Favorites/containers/FavoritesPage/sagas';

export default function* favoritesSagas() {
  yield all([
    favoritesPageSagas()
  ]);
}
