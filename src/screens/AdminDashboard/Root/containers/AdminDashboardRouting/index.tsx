import React from 'react';
import AdminSideMenu from '@screens/AdminDashboard/Root/components/SideMenu';
import AdminDashboardRouting from '@screens/AdminDashboard/Root/components/Routing';
import DashboardEntry from '@containers/DashboardEntry';

const Root: React.FC = () => (
  <DashboardEntry sideMenu={AdminSideMenu} routing={AdminDashboardRouting} />
);

export default Root;
