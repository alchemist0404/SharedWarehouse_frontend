import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import { routerMiddleware } from 'connected-react-router';
import { history } from '@helpers/history.helper';

declare global {
  interface Window { // eslint-disable-line
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer(history),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history)
    )
  )
);

export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(rootSaga);
