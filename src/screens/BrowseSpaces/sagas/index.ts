import { all } from 'redux-saga/effects';
import searchSagas from '@screens/BrowseSpaces/containers/SearchBar/sagas';
import spacesSagas from '@screens/BrowseSpaces/containers/BrowseSpacesPage/sagas';

export default function* browseSpacesSagas() {
  yield all([
    searchSagas(),
    spacesSagas()
  ]);
}
