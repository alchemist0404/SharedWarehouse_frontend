import { Routine } from 'redux-saga-routines';
import { put } from 'redux-saga/effects';

export const trigger = (routine: Routine) => function* fn() {
  yield put(routine.trigger());
};
