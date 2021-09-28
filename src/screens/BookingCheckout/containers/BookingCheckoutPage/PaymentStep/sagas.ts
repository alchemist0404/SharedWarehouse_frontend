import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  addNewCardRoutine,
  createPaypalPaymentAtCheckoutRoutine,
  createPaypalPaymentAtDetailsRoutine,
  createStripePaymentAtCheckoutRoutine,
  createStripePaymentAtDetailsRoutine,
  createStripeSubscriptionRoutine,
  fetchPaymentRequirementsRoutine,
  fetchTransactionsRoutine,
  loadCreditCardsRoutine,
  setActiveStepRoutine,
  setTransactionsPageRoutine
} from '@screens/BookingCheckout/routines';
import {
  tryAddNewCreditCard,
  tryLoadCreditCards
} from '@screens/CreditCardConfiguration/containers/CreditCardConfiguration/sagas';
import { Routine } from 'redux-saga-routines';
import { toastr } from 'react-redux-toastr';
import paymentService from '@screens/BookingCheckout/services/payment.service';
import { CheckoutStep } from '@screens/BookingCheckout/model/CheckoutStep';
import { PayloadAction } from '@reduxjs/toolkit';
import { IPaymentRequestWithStripe, IStripePaymentRequest } from '@components/StripePaymentForm';
import { trigger } from '@helpers/sagas.helper';
import bookingPaymentService from '@screens/BookingCheckout/services/booking.payment.service';
import { IPaypalRequest } from '@screens/BookingCheckout/model/PaypalRequest';
import {
  extractBookingId,
  extractCurrentTransactionPage,
  extractTransactionPageSize
} from '@screens/BookingCheckout/reducers';

function* tryFetchPaymentRequirements({ payload }: Routine<any>) {
  try {
    const resp = yield call(bookingPaymentService.fetchPaymentRequirements, payload);
    yield put(fetchPaymentRequirementsRoutine.success(resp));
  } catch (e) {
    toastr.error('Cannot load payment information', e?.message);
    yield put(fetchPaymentRequirementsRoutine.failure(e?.message));
  }
}

function* handleSuccessfulPayment(paymentRoutine: Routine, paymentPayload: any) {
  yield put(paymentRoutine.success(paymentPayload));
  toastr.success('Success', 'Payment has been made!');
}

function* handleSuccessfulPaymentAndChangeCheckoutStep(paymentRoutine: Routine, paymentPayload: any) {
  yield handleSuccessfulPayment(paymentRoutine, paymentPayload);
  yield put(setActiveStepRoutine.fulfill(CheckoutStep.RESULT));
}

function* handleSuccessfulPaymentAndRefreshData(paymentRoutine: Routine, paymentPayload: any) {
  yield handleSuccessfulPayment(paymentRoutine, paymentPayload);
  const bookingId = yield select(extractBookingId);
  yield put(fetchPaymentRequirementsRoutine.trigger(bookingId));
  const currentPage = yield select(extractCurrentTransactionPage);
  if (currentPage !== 1) {
    yield put(setTransactionsPageRoutine.fulfill(1));
  } else {
    const pageSize = yield select(extractTransactionPageSize);
    yield put(fetchTransactionsRoutine.trigger({ bookingId, pageRequest: { page: 1, size: pageSize } }));
  }
}

function* handlePaymentError(e: Error, paymentRoutine: Routine) {
  toastr.error('Cannot make a payment', e?.message);
  yield put(paymentRoutine.failure(e?.message));
}

function* performPaypalPayment(payload: IPaypalRequest) {
  yield call(paymentService.capturePaypalPayment, payload);
}

function* tryCreatePaypalPaymentAtCheckout({ payload }: PayloadAction<IPaypalRequest>) {
  try {
    yield performPaypalPayment(payload);
    yield handleSuccessfulPaymentAndChangeCheckoutStep(createPaypalPaymentAtCheckoutRoutine, payload.transactionId);
  } catch (e) {
    yield handlePaymentError(e, createPaypalPaymentAtCheckoutRoutine);
  }
}

function* tryCreatePaypalPaymentAtDetails({ payload }: PayloadAction<IPaypalRequest>) {
  try {
    yield performPaypalPayment(payload);
    yield handleSuccessfulPaymentAndRefreshData(createPaypalPaymentAtCheckoutRoutine, payload);
  } catch (e) {
    yield handlePaymentError(e, createPaypalPaymentAtCheckoutRoutine);
  }
}

interface IPaymentIntentResponse {
  clientSecretFor3dSecure: string;
}

function* performStripePayment({ paymentMethodId, transactionId, stripe }: IPaymentRequestWithStripe) {
  const { clientSecretFor3dSecure }: IPaymentIntentResponse = yield call(
    paymentService.sendStripePaymentIntent,
    { paymentMethodId, transactionId }
  );
  if (clientSecretFor3dSecure) {
    const resp3dSecure = yield call(stripe.confirmCardPayment, clientSecretFor3dSecure);
    if (resp3dSecure.error) { // noinspection ExceptionCaughtLocallyJS
      throw resp3dSecure.error;
    }
    yield call(paymentService.confirmStripePaymentIntent, resp3dSecure);
  }
}

function* tryCreateStripePaymentAtCheckout(
  { payload }: PayloadAction<IPaymentRequestWithStripe>
) {
  try {
    yield performStripePayment(payload);
    yield handleSuccessfulPaymentAndChangeCheckoutStep(createStripePaymentAtCheckoutRoutine,
      { paymentMethodId: payload.paymentMethodId, transactionId: payload.transactionId } as IStripePaymentRequest);
  } catch (e) {
    yield handlePaymentError(e, createStripePaymentAtCheckoutRoutine);
  }
}

function* tryCreateStripePaymentAtDetails(
  { payload }: PayloadAction<IPaymentRequestWithStripe>
) {
  try {
    yield performStripePayment(payload);
    yield handleSuccessfulPaymentAndRefreshData(createStripePaymentAtCheckoutRoutine,
      { paymentMethodId: payload.paymentMethodId, transactionId: payload.transactionId } as IStripePaymentRequest);
  } catch (e) {
    yield handlePaymentError(e, createStripePaymentAtCheckoutRoutine);
  }
}

function* tryCreateStripeSubscription({ payload: bookingId }: PayloadAction<IStripePaymentRequest>) {
  try {
    yield call(paymentService.createStripeSubscription, bookingId);
    yield put(createStripeSubscriptionRoutine.success());
  } catch (e) {
    toastr.error('Failed to create subscription', e?.message);
    yield put(createStripeSubscriptionRoutine.failure(e?.message));
  }
}

export default function* paymentStepSagas() {
  yield all([
    yield takeEvery(createStripePaymentAtCheckoutRoutine.TRIGGER, tryCreateStripePaymentAtCheckout),
    yield takeEvery(createPaypalPaymentAtCheckoutRoutine.TRIGGER, tryCreatePaypalPaymentAtCheckout),
    yield takeEvery(fetchPaymentRequirementsRoutine.TRIGGER, tryFetchPaymentRequirements),
    yield takeEvery(loadCreditCardsRoutine.TRIGGER, tryLoadCreditCards(loadCreditCardsRoutine)),
    yield takeEvery(addNewCardRoutine.TRIGGER, tryAddNewCreditCard(addNewCardRoutine)),
    yield takeEvery(addNewCardRoutine.SUCCESS, trigger(loadCreditCardsRoutine)),
    yield takeEvery(createStripePaymentAtDetailsRoutine.TRIGGER, tryCreateStripePaymentAtDetails),
    yield takeEvery(createPaypalPaymentAtDetailsRoutine.TRIGGER, tryCreatePaypalPaymentAtDetails),
    yield takeEvery(createStripeSubscriptionRoutine.TRIGGER, tryCreateStripeSubscription),
    yield takeEvery(createStripePaymentAtDetailsRoutine.SUCCESS, tryCreateStripeSubscription),
    yield takeEvery(createStripePaymentAtCheckoutRoutine.SUCCESS, tryCreateStripeSubscription)
  ]);
}
