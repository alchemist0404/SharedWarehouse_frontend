import { all } from 'redux-saga/effects';
import membersSummaryPageSagas from '@screens/AdminDashboard/MembersSummary/containers/MembersSummaryPage/sagas';

export default function* membersSummarySagas() {
  yield all([
    membersSummaryPageSagas()
  ]);
}
