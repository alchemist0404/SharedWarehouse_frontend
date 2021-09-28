import React from 'react';
import HavesDashboardRouting from '@screens/HavesDashboard/Root/components/Routing';
import HavesSideMenu from '@screens/HavesDashboard/Root/components/SideMenu';
import DashboardEntry from '@containers/DashboardEntry';

const HavesDashboard: React.FC = () => (
  <DashboardEntry sideMenu={HavesSideMenu} routing={HavesDashboardRouting} />
);

export default HavesDashboard;
