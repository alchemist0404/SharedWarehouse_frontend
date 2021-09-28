import React from 'react';
import { NEEDS_DASHBOARD_ENDPOINTS } from '@screens/NeedsDashboard/Root/components/Routing/endpoints';
import SideMenu, { ITabProps } from '@containers/SideMenu';

export interface ISideMenuProps {
  className: string;
}

const NeedsSideMenu: React.FC<ISideMenuProps> = ({ className }) => {
  const { FAVORITES, ACCOUNT, DROP_PICK, SPACES, DASHBOARD, TRANSACTIONS, CARDS_CONFIG } = NEEDS_DASHBOARD_ENDPOINTS;

  const tabs: ITabProps[] = [
    { title: 'Dashboard', path: DASHBOARD, header: true },
    { title: 'Account', path: ACCOUNT },
    { title: 'Favorites', path: FAVORITES },
    { title: 'Spaces', path: SPACES },
    { title: 'Transactions', path: TRANSACTIONS },
    { title: 'Bookings & Scheduling', path: DROP_PICK },
    { title: 'Credit Cards', path: CARDS_CONFIG }
  ];

  return (
    <SideMenu tabs={tabs} className={className} />
  );
};

export default NeedsSideMenu;
