import React from 'react';
import NeedsSideMenu from '@screens/NeedsDashboard/Root/components/SideMenu';
import NeedsDashboardRouting from '@screens/NeedsDashboard/Root/components/Routing';
import DashboardEntry from '@containers/DashboardEntry';

const NeedsDashboard: React.FC = () => (
  <DashboardEntry sideMenu={NeedsSideMenu} routing={NeedsDashboardRouting} />
);

export default NeedsDashboard;
