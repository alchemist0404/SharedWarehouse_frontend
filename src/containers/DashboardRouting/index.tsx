import React from 'react';
import { useSelector } from 'react-redux';
import { extractUserRoles } from '@screens/Authorization/reducers';
import { Role } from '@screens/Authorization/models/Roles';
import NeedsDashboard from '@screens/NeedsDashboard/Root/containers/NeedsDashboardRouting';
import HavesDashboard from '@screens/HavesDashboard/Root/containers/HavesDashboardRouting';
import AdminDashboard from '@screens/AdminDashboard/Root/containers/AdminDashboardRouting';

const routingBasedOnRoles = (userRoles: Role[]) => {
  const userRole = userRoles[0];
  switch (userRole) {
    case Role.NEED:
      return NeedsDashboard;
    case Role.HAVE:
      return HavesDashboard;
    case Role.ADMIN:
      return AdminDashboard;
    default:
      return Object.assign(() => <div>{`unknown role ${userRole}`}</div>, { displayName: 'UnknownRole' });
  }
};

const DashboardRouting: React.FC = () => {
  const userRoles = useSelector(extractUserRoles);
  const Routing = routingBasedOnRoles(userRoles);

  return <Routing />;
};

export default DashboardRouting;
