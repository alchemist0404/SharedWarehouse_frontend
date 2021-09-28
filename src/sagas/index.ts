import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import adminDashboardSagas from '@screens/AdminDashboard/Root/sagas';
import creditCardConfigurationSagas from '@screens/CreditCardConfiguration/sagas';
import spaceEditorSagas from '@screens/SpaceEditor/sagas';
import buildingEditorSagas from '@screens/BuildingEditor/sagas';
import havesDashboardSagas from '@screens/HavesDashboard/Root/sagas';
import needsDashboardSagas from '@screens/NeedsDashboard/Root/sagas';
import userMainSagas from '@screens/UserMain/sagas';
import bookingCheckoutSagas from '@screens/BookingCheckout/sagas';
import authSagas from '@screens/Authorization/sagas';
import browseSpacesSagas from '@screens/BrowseSpaces/sagas';
import buildingDetailsSagas from '@screens/BuildingDetails/sagas';

export default function* rootSaga() {
  yield all([
    /* PlopJS sagas placeholder. Do not remove */
    adminDashboardSagas(),
    creditCardConfigurationSagas(),
    spaceEditorSagas(),
    buildingEditorSagas(),
    havesDashboardSagas(),
    needsDashboardSagas(),
    userMainSagas(),
    bookingCheckoutSagas(),
    authSagas(),
    browseSpacesSagas(),
    buildingDetailsSagas()
  ]);
}
