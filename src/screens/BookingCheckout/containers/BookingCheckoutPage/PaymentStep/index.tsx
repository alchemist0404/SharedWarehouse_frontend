import React, { useEffect } from 'react';
import PaymentEmbedding from '@screens/BookingCheckout/components/PaymentEmbedding';
import { Loader } from 'semantic-ui-react';
import { extractUserEmail } from '@screens/Authorization/reducers';
import {
  addNewCardRoutine,
  createPaypalPaymentAtCheckoutRoutine,
  createStripePaymentAtCheckoutRoutine,
  fetchPaymentRequirementsRoutine,
  loadCreditCardsRoutine
} from '@screens/BookingCheckout/routines';
import { connect } from 'react-redux';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import {
  extractAddNewCardError,
  extractAddNewCardLoading,
  extractCreatePaypalPaymentAtCheckoutError,
  extractCreatePaypalPaymentAtCheckoutLoading,
  extractCreateStripePaymentAtCheckoutError,
  extractCreateStripePaymentAtCheckoutLoading,
  extractCreditCards,
  extractFetchPaymentRequirementsLoading,
  extractLoadCreditCardsLoading,
  extractPaymentRequirements
} from '@screens/BookingCheckout/reducers';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import styles from './styles.module.scss';
import PaymentInfo from '@screens/BookingCheckout/components/PaymentInfo';
import { IPaypalRequest } from '@screens/BookingCheckout/model/PaypalRequest';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import { ICreateCardRequest } from '@components/StripeAddCardForm';
import { IPaymentRequestWithStripe } from '@components/StripePaymentForm';

export interface IPaymentStepProps extends IState, IActions {
  bookingId?: string;
}

interface IState {
  paymentRequirementsLoading: boolean;
  userEmail: string;
  paymentRequirements: IPaymentRequirementResponse;
  stripePaymentLoading: boolean;
  stripePaymentError?: string;
  paypalPaymentLoading: boolean;
  paypalPaymentError?: string;
  cardsLoading: boolean;
  creditCards: ICreditCard[];
  addNewCardLoading: boolean;
  addNewCardError?: string;
}

interface IActions {
  fetchPaymentRequirements: IBindingCallback1<string>;
  createStripePayment: IBindingCallback1<IPaymentRequestWithStripe>;
  createPaypalPayment: IBindingCallback1<IPaypalRequest>;
  loadCreditCards: IBindingAction;
  addNewCard: IBindingCallback1<ICreateCardRequest>;
}

const PaymentStep: React.FC<IPaymentStepProps> = (
  {
    bookingId, fetchPaymentRequirements, paymentRequirementsLoading, userEmail, paymentRequirements,
    createStripePayment, stripePaymentLoading, stripePaymentError, loadCreditCards, creditCards, createPaypalPayment,
    paypalPaymentLoading, paypalPaymentError, cardsLoading, addNewCardError, addNewCard, addNewCardLoading
  }
) => {
  useEffect(() => {
    if (bookingId) {
      fetchPaymentRequirements(bookingId);
    }
  }, [fetchPaymentRequirements, bookingId]);

  return (
    <>
      <Loader active={paymentRequirementsLoading || !paymentRequirements} />
      {!paymentRequirementsLoading && paymentRequirements && (
        <>
          {paymentRequirements?.priceSummary ? (
            <>
              <PaymentInfo paymentRequirements={paymentRequirements} />
              <div className={styles.payment_container}>
                <PaymentEmbedding
                  commonProps={{
                    price: paymentRequirements.priceSummary.sumToPay,
                    transactionId: paymentRequirements.transactionId,
                    userEmail
                  }}
                  paypalTabProps={{
                    createPayment: createPaypalPayment,
                    paymentLoading: paypalPaymentLoading,
                    paymentError: paypalPaymentError
                  }}
                  creditCardTabProps={{
                    createPayment: createStripePayment,
                    paymentLoading: stripePaymentLoading,
                    paymentError: stripePaymentError,
                    cardsLoading,
                    creditCards,
                    loadCards: loadCreditCards,
                    newCardProps: {
                      addNewCardLoading,
                      addNewCardError,
                      addNewCard
                    }
                  }}
                />
              </div>
            </>
          ) : (
            <>
              Already paid or not available for paying yet
            </>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps: (state) => IState = state => ({
  userEmail: extractUserEmail(state),
  paymentRequirementsLoading: extractFetchPaymentRequirementsLoading(state),
  paymentRequirements: extractPaymentRequirements(state),
  stripePaymentLoading: extractCreateStripePaymentAtCheckoutLoading(state),
  stripePaymentError: extractCreateStripePaymentAtCheckoutError(state),
  paypalPaymentLoading: extractCreatePaypalPaymentAtCheckoutLoading(state),
  paypalPaymentError: extractCreatePaypalPaymentAtCheckoutError(state),
  cardsLoading: extractLoadCreditCardsLoading(state),
  creditCards: extractCreditCards(state),
  addNewCardLoading: extractAddNewCardLoading(state),
  addNewCardError: extractAddNewCardError(state)
});

const mapDispatchToProps: IActions = {
  fetchPaymentRequirements: fetchPaymentRequirementsRoutine,
  createStripePayment: createStripePaymentAtCheckoutRoutine,
  createPaypalPayment: createPaypalPaymentAtCheckoutRoutine,
  loadCreditCards: loadCreditCardsRoutine,
  addNewCard: addNewCardRoutine
};

export { PaymentStep };

export type IPaymentStepState = IState;
export type IPaymentStepActions = IActions;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStep);
