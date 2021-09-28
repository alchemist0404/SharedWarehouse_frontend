import React from 'react';
import SideMenu from '@containers/SideMenu';
import { ADMIN_DASHBOARD_ENDPOINTS } from '@screens/AdminDashboard/Root/components/Routing/endpoints';

export interface IHavesSideMenuProps {
  className: string;
}

const AdminSideMenu: React.FC<IHavesSideMenuProps> = ({ className }) => {
  const { DASHBOARD, MEMBERS } = ADMIN_DASHBOARD_ENDPOINTS;

  return (
    <SideMenu
      className={className}
      tabs={[
        { title: 'Dashboard', header: true, path: DASHBOARD },
        { title: 'Members', path: MEMBERS }
      ]}
    />
  );
};

export default AdminSideMenu;
