import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  fetchMemberDetailsRoutine,
  fetchMembersRoutine,
  saveMemberProfileRoutine
} from '@screens/AdminDashboard/MembersSummary/routines';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';
import userService from '@services/user.service';
import {
  extractCurrentPage,
  extractCurrentSize,
  extractMemberDetails
} from '@screens/AdminDashboard/MembersSummary/reducers';

export const tryFetchMembers = (routine: Routine) => function* fetchMembers({ payload }: Routine<any>) {
  try {
    const resp = yield call(userService.fetchMembers, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to fetch members', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const tryFetchMemberDetails = (routine: Routine) => function* fetchMemberDetails({ payload }: Routine<any>) {
  try {
    const resp = yield call(userService.fetchMemberById, payload);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Failed to fetch member details', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export const trySaveMemberProfile = (routine: Routine, loadRoutine: Routine) => function* saveMemberProfile({ payload }: Routine<any>) {
  try {
    const { id } = yield select(extractMemberDetails);
    const resp = id
      ? yield call(userService.updateMemberProfile, { id, data: payload })
      : yield call(userService.createMemberProfile, payload);
    toastr.success('Success', 'Member profile has been successfully saved');
    yield put(routine.success(resp));
    const page = yield select(extractCurrentPage);
    const size = yield select(extractCurrentSize);
    yield put(loadRoutine.trigger({ page, size }));
  } catch (e) {
    toastr.error('Failed to update member profile', e?.message);
    yield put(routine.failure(e?.message));
  }
};

export default function* membersSummaryPageSagas() {
  yield all([
    yield takeEvery(fetchMembersRoutine.TRIGGER, tryFetchMembers(fetchMembersRoutine)),
    yield takeEvery(fetchMemberDetailsRoutine.TRIGGER, tryFetchMemberDetails(fetchMemberDetailsRoutine)),
    yield takeEvery(
      saveMemberProfileRoutine.TRIGGER, trySaveMemberProfile(saveMemberProfileRoutine, fetchMembersRoutine)
    )
  ]);
}
