import { all } from 'redux-saga/effects';
import creditCardConfigurationPageSagas
  from '@screens/CreditCardConfiguration/containers/CreditCardConfiguration/sagas';

export default function* creditCardConfigurationSagas() {
  yield all([
    creditCardConfigurationPageSagas()
  ]);
}
