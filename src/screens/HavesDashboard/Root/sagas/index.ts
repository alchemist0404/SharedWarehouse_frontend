import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import financialBankingSagas from '@screens/HavesDashboard/FinancialBanking/sagas';
import favoritesSagas from '@screens/HavesDashboard/Favorites/sagas';
import dropOffAndPickUpSagas from '@screens/HavesDashboard/DropOffAndPickUp/sagas';
import buildingsSagas from '@screens/HavesDashboard/Buildings/sagas';
import transactionsSagas from '@screens/HavesDashboard/Transactions/sagas';
import accountSagas from '@screens/HavesDashboard/Account/sagas';
import dashboardSagas from '@screens/HavesDashboard/Dashboard/sagas';

export default function* havesDashboardSagas() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    financialBankingSagas(),
    favoritesSagas(),
    dropOffAndPickUpSagas(),
    buildingsSagas(),
    transactionsSagas(),
    accountSagas(),
    dashboardSagas()
  ]);
}
