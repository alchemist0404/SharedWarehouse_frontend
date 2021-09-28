import { all } from 'redux-saga/effects';
import financialBankingPageSagas from '@screens/HavesDashboard/FinancialBanking/containers/FinancialBankingPage/sagas';

export default function* financialBankingSagas() {
  yield all([
    financialBankingPageSagas()
  ]);
}
