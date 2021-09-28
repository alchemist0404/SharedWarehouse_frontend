import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import dropOffAndPickUpSagas from '@screens/NeedsDashboard/DropOffAndPickUp/sagas';
import favoritesSagas from '@screens/NeedsDashboard/Favorites/sagas';
import transactionsSagas from '@screens/NeedsDashboard/Transactions/sagas';
import bookedSpacesSagas from '@screens/NeedsDashboard/BookedSpaces/sagas';
import buildingDetailsSagas from '@screens/NeedsDashboard/BuildingDetails/sagas';
import accountSagas from '@screens/NeedsDashboard/Account/sagas';
import dashboardSagas from '@screens/NeedsDashboard/Dashboard/sagas';

export default function* needsDashboardSagas() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    dropOffAndPickUpSagas(),
    favoritesSagas(),
    transactionsSagas(),
    bookedSpacesSagas(),
    buildingDetailsSagas(),
    accountSagas(),
    dashboardSagas()
  ]);
}
