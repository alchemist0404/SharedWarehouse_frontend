import { connect } from 'react-redux';
import {
  IPaymentStepActions,
  IPaymentStepState,
  PaymentStep
} from '@screens/BookingCheckout/containers/BookingCheckoutPage/PaymentStep';
import { extractUserEmail } from '@screens/Authorization/reducers';
import {
  extractAddNewCardError,
  extractAddNewCardLoading,
  extractCreatePaypalPaymentAtDetailsError,
  extractCreatePaypalPaymentAtDetailsLoading,
  extractCreateStripePaymentAtDetailsError,
  extractCreateStripePaymentAtDetailsLoading,
  extractCreditCards,
  extractLoadCreditCardsLoading
} from '@screens/BookingCheckout/reducers';
import {
  addNewCardRoutine,
  createPaypalPaymentAtDetailsRoutine,
  createStripePaymentAtDetailsRoutine,
  loadCreditCardsRoutine
} from '@screens/BookingCheckout/routines';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';

interface IStepProps {
  paymentRequirements: IPaymentRequirementResponse;
}

const mapStateToProps: (state, ownProps: IStepProps) => IPaymentStepState = (state, ownProps) => ({
  userEmail: extractUserEmail(state),
  paymentRequirementsLoading: false,
  paymentRequirements: ownProps.paymentRequirements,
  stripePaymentLoading: extractCreateStripePaymentAtDetailsLoading(state),
  stripePaymentError: extractCreateStripePaymentAtDetailsError(state),
  paypalPaymentLoading: extractCreatePaypalPaymentAtDetailsLoading(state),
  paypalPaymentError: extractCreatePaypalPaymentAtDetailsError(state),
  cardsLoading: extractLoadCreditCardsLoading(state),
  creditCards: extractCreditCards(state),
  addNewCardLoading: extractAddNewCardLoading(state),
  addNewCardError: extractAddNewCardError(state)
});

const mapDispatchToProps: IPaymentStepActions = {
  fetchPaymentRequirements: () => null,
  createStripePayment: createStripePaymentAtDetailsRoutine,
  createPaypalPayment: createPaypalPaymentAtDetailsRoutine,
  loadCreditCards: loadCreditCardsRoutine,
  addNewCard: addNewCardRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStep);
