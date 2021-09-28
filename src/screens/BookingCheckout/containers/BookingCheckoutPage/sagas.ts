import { all, takeEvery } from 'redux-saga/effects';
import { toggleFavoriteRoutine } from '@screens/BookingCheckout/routines';
import { tryToggleFavoriteBuilding } from '@sagas/favorite.building.saga';

export default function* bookingCheckoutPageSagas() {
  yield all([
    yield takeEvery(toggleFavoriteRoutine.TRIGGER, tryToggleFavoriteBuilding(toggleFavoriteRoutine))
  ]);
}
