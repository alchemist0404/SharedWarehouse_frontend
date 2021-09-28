import { combineReducers } from 'redux';
/* PlopJS import placeholder. Do not remove */
import dropOffAndPickUp from '@screens/NeedsDashboard/DropOffAndPickUp/reducers';
import favorites from '@screens/NeedsDashboard/Favorites/reducers';
import transactions from '@screens/NeedsDashboard/Transactions/reducers';
import bookedSpaces from '@screens/NeedsDashboard/BookedSpaces/reducers';
import buildingDetails from '@screens/NeedsDashboard/BuildingDetails/reducers';
import account from '@screens/NeedsDashboard/Account/reducers';
import dashboard from '@screens/NeedsDashboard/Dashboard/reducers';

export default combineReducers({
  /* PlopJS reducer placeholder. Do not remove */
  dropOffAndPickUp,
  favorites,
  transactions,
  bookedSpaces,
  buildingDetails,
  account,
  dashboard
});
