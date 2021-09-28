import { combineReducers } from 'redux';
/* PlopJS import placeholder. Do not remove */
import financialBanking from '@screens/HavesDashboard/FinancialBanking/reducers';
import favorites from '@screens/HavesDashboard/Favorites/reducers';
import dropOffAndPickUp from '@screens/HavesDashboard/DropOffAndPickUp/reducers';
import buildings from '@screens/HavesDashboard/Buildings/reducers';
import transactions from '@screens/HavesDashboard/Transactions/reducers';
import account from '@screens/HavesDashboard/Account/reducers';
import dashboard from '@screens/HavesDashboard/Dashboard/reducers';

export default combineReducers({
  /* PlopJS reducer placeholder. Do not remove */
  financialBanking,
  favorites,
  dropOffAndPickUp,
  buildings,
  transactions,
  account,
  dashboard
});
