import { all } from 'redux-saga/effects';
import bookingCheckoutPageSagas from '@screens/BookingCheckout/containers/BookingCheckoutPage/sagas';
import paymentStepSagas from '@screens/BookingCheckout/containers/BookingCheckoutPage/PaymentStep/sagas';
import bookingRootPageSagas from '@screens/BookingCheckout/containers/BookingRootPage/sagas';
import bookingDetailsPageSagas from '@screens/BookingCheckout/containers/BookingDetailsPage/TransactionsBlock/sagas';

export default function* bookingCheckoutSagas() {
  yield all([
    bookingCheckoutPageSagas(),
    paymentStepSagas(),
    bookingRootPageSagas(),
    bookingDetailsPageSagas()
  ]);
}
