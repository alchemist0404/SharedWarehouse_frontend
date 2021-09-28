import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '@screens/NeedsDashboard/Dashboard/containers/DashboardPage';
import Account from '@screens/NeedsDashboard/Account/containers/AccountPage';
import OptionalBuildingRenderer from '@components/OptionalBuildingRenderer';
import BookedSpaces from '@screens/NeedsDashboard/BookedSpaces/containers/BookedSpacesPage';
import Transactions from '@screens/NeedsDashboard/Transactions/containers/TransactionsPage';
import { NEEDS_DASHBOARD_ENDPOINTS } from './endpoints';
import Favorites from '@screens/NeedsDashboard/Favorites/containers/FavoritesPage';
import DropOffAndPickUp from '@screens/NeedsDashboard/DropOffAndPickUp/containers/DropOffAndPickUpPage';
import AppRoute from '@containers/AppRoute';
import NotFound from '@components/404NotFound';
import CreditCardConfigPage from '@screens/NeedsDashboard/CreditCardConfig/containers';

export const withOptionalBuilding = Component => props => (
  <OptionalBuildingRenderer>
    <Component {...props} />
  </OptionalBuildingRenderer>
);

const NeedsDashboardRouting: React.FC = () => {
  const { DASHBOARD, ACCOUNT, DROP_PICK, FAVORITES, SPACES, TRANSACTIONS, CARDS_CONFIG } = NEEDS_DASHBOARD_ENDPOINTS;
  return (
    <Switch>
      <AppRoute orange exact path={DASHBOARD} component={withOptionalBuilding(Dashboard)} />
      <AppRoute orange exact path={ACCOUNT} component={Account} />
      <AppRoute orange exact path={FAVORITES} component={withOptionalBuilding(Favorites)} />
      <AppRoute orange exact path={SPACES} component={withOptionalBuilding(BookedSpaces)} />
      <AppRoute orange exact path={TRANSACTIONS} component={Transactions} />
      <AppRoute orange exact path={DROP_PICK} component={DropOffAndPickUp} />
      <AppRoute orange exact path={CARDS_CONFIG} component={CreditCardConfigPage} />
      <AppRoute component={NotFound} orange />
    </Switch>
  );
};

export default NeedsDashboardRouting;
