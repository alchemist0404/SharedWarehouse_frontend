import { all } from 'redux-saga/effects';
import transactionsPageSagas from '@screens/NeedsDashboard/Transactions/containers/TransactionsPage/sagas';

export default function* transactionsSagas() {
  yield all([
    transactionsPageSagas()
  ]);
}
