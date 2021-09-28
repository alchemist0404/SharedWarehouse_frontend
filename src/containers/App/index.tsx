import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import { history } from '@helpers/history.helper';
import { store } from '@root/store';
import Routing from '@containers/Routing';
import AuthorizationEntry from '@screens/Authorization/containers/AuthorizationEntry';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@helpers/stripe.helper';

const App: React.FC = () => (
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      closeOnToastrClick
    />
    <ConnectedRouter history={history}>
      <AuthorizationEntry>
        <Elements stripe={stripePromise}>
          <Routing />
        </Elements>
      </AuthorizationEntry>
    </ConnectedRouter>
  </Provider>
);

export default App;
