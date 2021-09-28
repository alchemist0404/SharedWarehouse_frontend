/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';
import { IFetchTransactionsForBookingRequest } from '@screens/BookingCheckout/containers/BookingDetailsPage/TransactionsBlock';

const createBookingCheckoutRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`BOOKING_CHECKOUT:${actionName}`);
const createBookingDetailsRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`BOOKING_DETAILS:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const createStripeSubscriptionRoutine = createBookingCheckoutRoutine<string>('CREATE_STRIPE_SUBSCRIPTION');
export const setTransactionsPageRoutine = createBookingCheckoutRoutine('SET_TRANSACTIONS_PAGE');
export const fetchTransactionsRoutine = createBookingCheckoutRoutine<IFetchTransactionsForBookingRequest>('FETCH_TRANSACTIONS_FOR_BOOKING');
export const loadBookingDetailsRoutine = createBookingCheckoutRoutine('LOAD_BOOKING_DETAILS');
export const addNewCardRoutine = createBookingCheckoutRoutine('ADD_NEW_CARD');
export const loadCreditCardsRoutine = createBookingCheckoutRoutine('LOAD_CREDIT_CARDS');
export const toggleFavoriteRoutine = createBookingCheckoutRoutine('TOGGLE_FAVORITE');
export const createPaypalPaymentAtCheckoutRoutine = createBookingCheckoutRoutine('CREATE_PAYPAL_PAYMENT');
export const createPaypalPaymentAtDetailsRoutine = createBookingDetailsRoutine('CREATE_PAYPAL_PAYMENT');
export const setActiveStepRoutine = createBookingCheckoutRoutine('SET_ACTIVE_STEP');
export const createStripePaymentAtCheckoutRoutine = createBookingCheckoutRoutine('CREATE_STRIPE_PAYMENT');
export const createStripePaymentAtDetailsRoutine = createBookingDetailsRoutine('CREATE_STRIPE_PAYMENT');
export const fetchPaymentRequirementsRoutine = createBookingCheckoutRoutine<string>('FETCH_PAYMENT_REQUIREMENTS');
