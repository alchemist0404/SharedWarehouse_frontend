import { all } from 'redux-saga/effects';
import transactionsPageSagas from '@screens/HavesDashboard/Transactions/containers/TransactionsPage/sagas';

export default function* transactionsSagas() {
  yield all([
    transactionsPageSagas()
  ]);
}
