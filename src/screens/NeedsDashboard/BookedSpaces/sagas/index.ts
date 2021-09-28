import { all } from 'redux-saga/effects';
import bookedSpacesPageSagas from '@screens/NeedsDashboard/BookedSpaces/containers/BookedSpacesPage/sagas';

export default function* bookedSpacesSagas() {
  yield all([
    bookedSpacesPageSagas()
  ]);
}
