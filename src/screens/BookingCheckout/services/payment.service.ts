import { callApi } from '@helpers/api.helper';
import { IPaypalRequest } from '@screens/BookingCheckout/model/PaypalRequest';
import { IStripePaymentRequest } from '@components/StripePaymentForm';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';

interface IConfirmPaymentIntent {
  paymentIntent?: PaymentIntent;
  error?: StripeError;
}

const stripePaymentService = {
  sendStripePaymentIntent: (requestData: IStripePaymentRequest) => callApi({
    endpoint: 'stripe/payment_intent',
    method: 'POST',
    requestData
  }),
  confirmStripePaymentIntent: (requestData: IConfirmPaymentIntent) => callApi({
    endpoint: 'stripe/payment_intent',
    method: 'PATCH',
    requestData
  }),
  capturePaypalPayment: (requestData: IPaypalRequest) => callApi({
    endpoint: 'paypal/capture',
    method: 'POST',
    requestData
  }),
  createStripeSubscription: (requestData: IStripePaymentRequest) => callApi({
    endpoint: 'stripe/subscription/create/',
    method: 'PUT',
    requestData
  })
};

export default stripePaymentService;
