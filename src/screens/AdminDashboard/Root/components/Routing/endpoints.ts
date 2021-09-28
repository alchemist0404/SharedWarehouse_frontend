const dashboard = path => `/user${path === '' ? '' : `/${path}`}`;

export const ADMIN_DASHBOARD_ENDPOINTS = {
  DASHBOARD: dashboard(''),
  MEMBERS: dashboard('members')
};
