import { getOsEnv } from 'helpers/path.helper';

export const env = {
  stripeKey: getOsEnv('REACT_APP_STRIPE_PUBLISHABLE_KEY'),
  paypalClientId: getOsEnv('REACT_APP_PAYPAL_CLIENT_ID'),
  sentryDsn: getOsEnv('REACT_APP_SENTRY_DSN'),
  googleApiKey: getOsEnv('REACT_APP_GOOGLE_API_KEY'),
  geocodioApiKey: getOsEnv('REACT_APP_GEOCODIO_API_KEY')
};
