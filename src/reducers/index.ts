import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';
/* PlopJS import placeholder. Do not remove */
import adminDashboard from '@screens/AdminDashboard/Root/reducers';
import creditCardConfiguration from '@screens/CreditCardConfiguration/reducers';
import spaceEditor from '@screens/SpaceEditor/reducers';
import buildingEditor from '@screens/BuildingEditor/reducers';
import havesDashboard from '@screens/HavesDashboard/Root/reducers';
import needsDashboard from '@screens/NeedsDashboard/Root/reducers';
import userMain from '@screens/UserMain/reducers';
import bookingCheckout from '@screens/BookingCheckout/reducers';
import auth from '@screens/Authorization/reducers';
import spaceBrowse from '@screens/BrowseSpaces/reducers';
import buildingDetails from '@screens/BuildingDetails/reducers';
import routerReducer from '@containers/AppRoute/reducer';
import stompClient from './stompClient';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  toastr,
  routerReducer,
  stompClient,
  /* PlopJS reducer placeholder. Do not remove */
  adminDashboard,
  creditCardConfiguration,
  spaceEditor,
  buildingEditor,
  havesDashboard,
  needsDashboard,
  userMain,
  bookingCheckout,
  auth,
  spaceBrowse,
  buildingDetails
});

export default createRootReducer;
