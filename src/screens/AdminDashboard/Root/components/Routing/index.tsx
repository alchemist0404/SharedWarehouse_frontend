import React from 'react';
import { Switch } from 'react-router-dom';
import { ADMIN_DASHBOARD_ENDPOINTS } from '@screens/AdminDashboard/Root/components/Routing/endpoints';
import AppRoute from '@containers/AppRoute';
import NotFound from '@components/404NotFound';
import Dashboard from '@screens/AdminDashboard/Dashboard/containers/DashboardPage';
import MembersSummary from '@screens/AdminDashboard/MembersSummary/containers/MembersSummaryPage';

const AdminDashboardRouting: React.FC = () => {
  const { DASHBOARD, MEMBERS } = ADMIN_DASHBOARD_ENDPOINTS;

  return (
    <Switch>
      <AppRoute orange exact path={DASHBOARD} component={Dashboard} />
      <AppRoute orange exact path={MEMBERS} component={MembersSummary} />
      <AppRoute component={NotFound} orange />
    </Switch>
  );
};

export default AdminDashboardRouting;
