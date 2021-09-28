const dashboard = path => `/user${path === '' ? '' : `/${path}`}`;

export const HAVES_DASHBOARD_ENDPOINTS = {
  DASHBOARD: dashboard(''),
  MESSAGES: dashboard('messages'),
  ACCOUNT: dashboard('account'),
  TRANSACTIONS: dashboard('transactions'),
  BUILDINGS: dashboard('buildings'),
  SCHEDULE: dashboard('schedule'),
  FAVORITES: dashboard('favorites'),
  FINANCIAL: dashboard('financial')
};
