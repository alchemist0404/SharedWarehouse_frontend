import { all, takeEvery } from 'redux-saga/effects';
import { fetchTransactionsRoutine } from '@screens/HavesDashboard/Transactions/routines';
import { tryFetchTransactions } from '@screens/NeedsDashboard/Transactions/containers/TransactionsPage/sagas';

export default function* transactionsPageSagas() {
  yield all([
    yield takeEvery(fetchTransactionsRoutine.TRIGGER, tryFetchTransactions(fetchTransactionsRoutine))
  ]);
}
