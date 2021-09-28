import React from 'react';
import { Switch } from 'react-router-dom';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';
import Dashboard from '@screens/HavesDashboard/Dashboard/containers/DashboardPage';
import AppRoute from '@containers/AppRoute';
import Account from '@screens/HavesDashboard/Account/containers/AccountPage';
import { withOptionalBuilding } from '@screens/NeedsDashboard/Root/components/Routing';
import Transactions from '@screens/HavesDashboard/Transactions/containers/TransactionsPage';
import Buildings from '@screens/HavesDashboard/Buildings/containers/BuildingsPage';
import NotFound from '@components/404NotFound';
import DropOffAndPickUp from '@screens/HavesDashboard/DropOffAndPickUp/containers/DropOffAndPickUpPage';
import Favorites from '@screens/HavesDashboard/Favorites/containers/FavoritesPage';
import FinancialBanking from '@screens/HavesDashboard/FinancialBanking/containers/FinancialBankingPage';

const HavesDashboardRouting: React.FC = () => {
  const { DASHBOARD, ACCOUNT, TRANSACTIONS, BUILDINGS, SCHEDULE, FAVORITES, FINANCIAL } = HAVES_DASHBOARD_ENDPOINTS;

  return (
    <Switch>
      <AppRoute orange exact path={DASHBOARD} component={withOptionalBuilding(Dashboard)} />
      <AppRoute orange exact path={ACCOUNT} component={Account} />
      <AppRoute orange exact path={TRANSACTIONS} component={Transactions} />
      <AppRoute orange exact path={BUILDINGS} component={withOptionalBuilding(Buildings)} />
      <AppRoute orange exact path={SCHEDULE} component={DropOffAndPickUp} />
      <AppRoute orange exact path={FAVORITES} component={withOptionalBuilding(Favorites)} />
      <AppRoute orange exact path={FINANCIAL} component={FinancialBanking} />
      <AppRoute component={NotFound} orange />
    </Switch>
  );
};

export default HavesDashboardRouting;
