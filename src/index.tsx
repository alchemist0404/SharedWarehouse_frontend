import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-day-picker/lib/style.css';
import '@styles/common.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-image-crop/lib/ReactCrop.scss';
import App from './containers/App';
import * as Sentry from '@sentry/react';
import { env } from './env';
import { Integrations } from '@sentry/tracing';
import { stompClientRegister } from '@services/websocket.service';

Sentry.init({
  dsn: env.sentryDsn,
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing()
  ],
  tracesSampleRate: 1.0
});
stompClientRegister();
ReactDOM.render(<App />, document.getElementById('root'));
