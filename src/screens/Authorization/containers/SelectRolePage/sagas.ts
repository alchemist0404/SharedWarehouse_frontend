import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Routine } from 'redux-saga-routines';
import { selectRoles } from '@screens/Authorization/services/role_selection.service';
import { selectRolesRoutine } from '@screens/Authorization/routines';
import { toastr } from 'react-redux-toastr';

function* trySelectRole({ payload }: Routine<any>) {
  try {
    const resp = yield call(selectRoles, payload);
    yield put(selectRolesRoutine.success(resp));
    toastr.success('Success', 'Role selected!');
  } catch (e) {
    yield put(selectRolesRoutine.failure(e?.message));
    toastr.error('Failed to select role', e?.message);
  }
}

export default function* selectRolePageSagas() {
  yield all([
    yield takeEvery(selectRolesRoutine.TRIGGER, trySelectRole)
  ]);
}
