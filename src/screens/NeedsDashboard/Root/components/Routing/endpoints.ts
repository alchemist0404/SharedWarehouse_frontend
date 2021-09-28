const dashboard = path => `/user${path === '' ? '' : `/${path}`}`;

export const NEEDS_DASHBOARD_ENDPOINTS = {
  DASHBOARD: dashboard(''),
  ACCOUNT: dashboard('account'),
  FAVORITES: dashboard('favorites'),
  SPACES: dashboard('spaces'),
  TRANSACTIONS: dashboard('transactions'),
  DROP_PICK: dashboard('drop_pick'),
  CARDS_CONFIG: dashboard('cards_config')
};
