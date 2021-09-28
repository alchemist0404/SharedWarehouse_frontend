import { Routine } from 'redux-saga-routines';
import { call, put } from 'redux-saga/effects';
import favoritesService from '@services/favorites.service';
import { toastr } from 'react-redux-toastr';

export const tryToggleFavoriteBuilding = (routine: Routine) => function* toggleFavorite({ payload }: Routine<any>) {
  try {
    yield call(favoritesService.toggleFavoriteBuilding, payload);
    yield put(routine.success(payload));
  } catch (e) {
    toastr.error('Can\'t add or remove space from favorites', e?.message);
    yield put(routine.failure({ message: e?.message, id: payload }));
  }
};
