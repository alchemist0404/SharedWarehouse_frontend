import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { performSearchRoutine, setPageIndexRoutine, setPageSizeRoutine } from '@screens/BrowseSpaces/routines';
import * as searchService from '../../services/space_browsing.service';
import { extractQuery } from '@screens/BrowseSpaces/reducers';
import { setSearchFiltersRoutine } from '@screens/Landing/routines';
import { Routine } from 'redux-saga-routines';
import { history } from '@helpers/history.helper';
import { toastr } from 'react-redux-toastr';
import { ENDPOINTS } from '@containers/Routing/endpoints';

function* trySearch() {
  try {
    const query = yield select(extractQuery);
    const resp = yield call(searchService.loadSpaces, query);
    yield put(performSearchRoutine.success(resp));
  } catch (e) {
    toastr.error('Can\'t make search', e?.message);
    yield put(performSearchRoutine.failure(e?.message));
  }
}

function* triggerSearch() {
  yield put(performSearchRoutine.trigger());
}

function* setFilters({ payload }: Routine<any>) {
  yield put(setSearchFiltersRoutine.success(payload));
  history.push(ENDPOINTS.BROWSE);
}

export default function* searchSagas() {
  yield all([
    yield takeEvery(performSearchRoutine.TRIGGER, trySearch),
    yield takeEvery(setPageIndexRoutine.FULFILL, triggerSearch),
    yield takeEvery(setPageSizeRoutine.FULFILL, triggerSearch),
    yield takeEvery(setSearchFiltersRoutine.TRIGGER, setFilters)
  ]);
}
