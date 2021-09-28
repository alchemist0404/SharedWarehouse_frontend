import { all } from 'redux-saga/effects';
import favoritesPageSagas from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage/sagas';

export default function* favoritesSagas() {
  yield all([
    favoritesPageSagas()
  ]);
}
