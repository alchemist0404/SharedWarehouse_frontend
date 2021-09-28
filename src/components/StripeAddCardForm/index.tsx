import React from 'react';
import RawStripeForm from '@components/StripeForm';
import { CreatePaymentMethodCardData, Stripe } from '@stripe/stripe-js';
import { IBindingCallback1 } from '@models/Callbacks';
import { CardNumberElement } from '@stripe/react-stripe-js';

export interface IStripeAddCardFormProps {
  addCardLoading: boolean;
  userEmail: string;
  error: string;
  className?: string;
  addCard: IBindingCallback1<ICreateCardRequest>;
}

export interface ICreateCardRequest {
  stripe: Stripe;
  arg: CreatePaymentMethodCardData;
}

const StripeAddCardForm: React.FC<IStripeAddCardFormProps> = (
  { addCardLoading, error, className, addCard, userEmail }
) => {
  const onAddCardSubmit = (stripe, elements) => {
    addCard({
      stripe,
      arg: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        billing_details: {
          email: userEmail
        },
        type: 'card',
        card: elements.getElement(CardNumberElement)
      }
    });
  };

  return (
    <RawStripeForm
      onSubmit={onAddCardSubmit}
      submitLoading={addCardLoading}
      submitLabel="Add card"
      error={error}
      className={className}
    />
  );
};

export default StripeAddCardForm;
