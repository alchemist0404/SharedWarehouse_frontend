import React from 'react';
import SideMenu from '@containers/SideMenu';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';

export interface IHavesSideMenuProps {
  className: string;
}

const HavesSideMenu: React.FC<IHavesSideMenuProps> = ({ className }) => {
  const { DASHBOARD, ACCOUNT, TRANSACTIONS, BUILDINGS, SCHEDULE, FAVORITES, FINANCIAL } = HAVES_DASHBOARD_ENDPOINTS;

  return (
    <SideMenu
      className={className}
      tabs={[
        { title: 'Dashboard', header: true, path: DASHBOARD },
        { title: 'Account', path: ACCOUNT },
        { title: 'Favorites', path: FAVORITES },
        { title: 'Buildings', path: BUILDINGS },
        { title: 'Bookings & Scheduling', path: SCHEDULE },
        { title: 'Transactions', path: TRANSACTIONS },
        { title: 'Financial/Banking', path: FINANCIAL }
      ]}
    />
  );
};

export default HavesSideMenu;
