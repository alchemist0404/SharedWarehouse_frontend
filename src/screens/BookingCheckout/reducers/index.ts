import { combineReducers } from 'redux';
/* PlopJS import placeholder. Do not remove */
import {
  addNewCardRoutine,
  createPaypalPaymentAtCheckoutRoutine,
  createPaypalPaymentAtDetailsRoutine,
  createStripePaymentAtCheckoutRoutine,
  createStripePaymentAtDetailsRoutine,
  createStripeSubscriptionRoutine,
  fetchPaymentRequirementsRoutine,
  fetchTransactionsRoutine,
  loadBookingDetailsRoutine,
  loadCreditCardsRoutine,
  setActiveStepRoutine,
  setTransactionsPageRoutine,
  toggleFavoriteRoutine
} from '@screens/BookingCheckout/routines';
import { reducerCreator } from '@helpers/reducer.helper';
import { paymentReducer } from '@screens/BookingCheckout/containers/BookingCheckoutPage/PaymentStep/reducer';
import { bookingCheckoutReducer } from '@screens/BookingCheckout/containers/BookingCheckoutPage/reducer';
import { RootState } from '@root/store';
import { bookingRootPageReducer } from '@screens/BookingCheckout/containers/BookingRootPage/reducer';
import { bookingDetailsPageReducer } from '@screens/BookingCheckout/containers/BookingDetailsPage/TransactionsBlock/reducer';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  createStripeSubscriptionRequest: reducerCreator([createStripeSubscriptionRoutine.TRIGGER]),
  setTransactionsPageRequest: reducerCreator([setTransactionsPageRoutine.TRIGGER]),
  fetchTransactionsRequest: reducerCreator([fetchTransactionsRoutine.TRIGGER]),
  loadBookingDetailsRequest: reducerCreator([loadBookingDetailsRoutine.TRIGGER]),
  addNewCardRequest: reducerCreator([addNewCardRoutine.TRIGGER]),
  loadCreditCardsRequest: reducerCreator([loadCreditCardsRoutine.TRIGGER]),
  toggleFavoriteRequest: reducerCreator([toggleFavoriteRoutine.TRIGGER]),
  createPaypalPaymentRequestAtCheckout: reducerCreator([createPaypalPaymentAtCheckoutRoutine.TRIGGER]),
  createPaypalPaymentRequestAtDetails: reducerCreator([createPaypalPaymentAtDetailsRoutine.TRIGGER]),
  createStripePaymentRequestAtCheckout: reducerCreator([createStripePaymentAtCheckoutRoutine.TRIGGER]),
  createStripePaymentRequestAtDetails: reducerCreator([createStripePaymentAtDetailsRoutine.TRIGGER]),
  setActiveStepRequest: reducerCreator([setActiveStepRoutine.TRIGGER]),
  fetchPaymentRequirementsRequest: reducerCreator([fetchPaymentRequirementsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  bookingRoot: bookingRootPageReducer,
  payment: paymentReducer,
  checkout: bookingCheckoutReducer,
  bookingDetails: bookingDetailsPageReducer
});

const reqs = (state: RootState) => state.bookingCheckout.requests;
const payment = (state: RootState) => state.bookingCheckout.payment;
const checkout = (state: RootState) => state.bookingCheckout.checkout;
const bookingRoot = (state: RootState) => state.bookingCheckout.bookingRoot;
const bookingDetails = (state: RootState) => state.bookingCheckout.bookingDetails;

export const extractPaymentRequirements = state => payment(state).requirements;
export const extractCreditCards = state => payment(state).creditCards;

export const extractCheckoutStep = state => checkout(state).step;

export const extractBookingDetails = state => bookingRoot(state).bookingDetails;
export const extractBookingData = state => bookingRoot(state).bookingDetails.booking;
export const extractBookingId = state => bookingRoot(state).bookingDetails.booking.booking.id;
export const extractBuildingData = state => bookingRoot(state).bookingDetails.building;

export const extractBookingTransactions = state => bookingDetails(state).transactions.items;
export const extractCurrentTransactionPage = state => bookingDetails(state).transactions.page;
export const extractTotalTransactionPages = state => bookingDetails(state).transactions.totalPages;
export const extractTransactionPageSize = state => bookingDetails(state).transactions.pageSize;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractCreateStripeSubscriptionLoading = state => reqs(state).createStripeSubscriptionRequest.loading;
export const extractCreateStripeSubscriptionError = state => reqs(state).createStripeSubscriptionRequest.error;
export const extractSetTransactionsPageLoading = state => reqs(state).setTransactionsPageRequest.loading;
export const extractSetTransactionsPageError = state => reqs(state).setTransactionsPageRequest.error;
export const extractFetchTransactionsLoading = state => reqs(state).fetchTransactionsRequest.loading;
export const extractFetchTransactionsError = state => reqs(state).fetchTransactionsRequest.error;
export const extractLoadBookingDetailsLoading = state => reqs(state).loadBookingDetailsRequest.loading;
export const extractLoadBookingDetailsError = state => reqs(state).loadBookingDetailsRequest.error;
export const extractAddNewCardLoading = state => reqs(state).addNewCardRequest.loading;
export const extractAddNewCardError = state => reqs(state).addNewCardRequest.error;
export const extractLoadCreditCardsLoading = state => reqs(state).loadCreditCardsRequest.loading;
export const extractLoadCreditCardsError = state => reqs(state).loadCreditCardsRequest.error;
export const extractToggleFavoriteLoading = state => reqs(state).toggleFavoriteRequest.loading;
export const extractToggleFavoriteError = state => reqs(state).toggleFavoriteRequest.error;
export const extractCreatePaypalPaymentAtCheckoutLoading = state => reqs(state).createPaypalPaymentRequestAtCheckout.loading;
export const extractCreatePaypalPaymentAtCheckoutError = state => reqs(state).createPaypalPaymentRequestAtCheckout.error;
export const extractCreatePaypalPaymentAtDetailsLoading = state => reqs(state).createPaypalPaymentRequestAtDetails.loading;
export const extractCreatePaypalPaymentAtDetailsError = state => reqs(state).createPaypalPaymentRequestAtDetails.error;
export const extractSetActiveStepLoading = state => reqs(state).setActiveStepRequest.loading;
export const extractSetActiveStepError = state => reqs(state).setActiveStepRequest.error;
export const extractCreateStripePaymentAtCheckoutLoading = state => reqs(state).createStripePaymentRequestAtCheckout.loading;
export const extractCreateStripePaymentAtCheckoutError = state => reqs(state).createStripePaymentRequestAtCheckout.error;
export const extractCreateStripePaymentAtDetailsLoading = state => reqs(state).createStripePaymentRequestAtDetails.loading;
export const extractCreateStripePaymentAtDetailsError = state => reqs(state).createStripePaymentRequestAtDetails.error;
export const extractFetchPaymentRequirementsLoading = state => reqs(state).fetchPaymentRequirementsRequest.loading;
export const extractFetchPaymentRequirementsError = state => reqs(state).fetchPaymentRequirementsRequest.error;
