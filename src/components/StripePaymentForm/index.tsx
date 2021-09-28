/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { IBookingPaymentProps } from '@screens/BookingCheckout/model/BookingPaymentProps';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import { Button, Form, FormSelect, Label } from 'semantic-ui-react';
import { toPrice } from '@helpers/price.helper';
import { twoDigit } from '@screens/CreditCardConfiguration/components/CreditCardItem';
import { Stripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import styles from './styles.module.scss';
import NewCardModal, { INewCardExternalProps } from '@screens/CreditCardConfiguration/components/NewCardModal';

export interface IStripeFormProps {
  className?: string;
  createPayment: IBindingCallback1<IPaymentRequestWithStripe>;
  loadCards: IBindingAction;
  cardsLoading: boolean;
  creditCards: ICreditCard[];
  newCardProps: INewCardExternalProps;
  paymentLoading: boolean;
  paymentError?: string;
}

export interface IStripePaymentRequest {
  paymentMethodId: string;
  transactionId: string;
}

export interface IPaymentRequestWithStripe extends IStripePaymentRequest {
  stripe: Stripe;
}

const StripePaymentForm: React.FC<IStripeFormProps & IBookingPaymentProps> = (
  {
    className, price, createPayment, transactionId, paymentLoading, paymentError, creditCards,
    cardsLoading, loadCards, userEmail, newCardProps: { addNewCard, addNewCardError, addNewCardLoading }
  }
) => {
  const defaultPm = useCallback(() => {
    const id = creditCards.find(cc => cc.primary)?.id;
    return (id || (creditCards.length === 0 ? '' : creditCards[0].id));
  }, [creditCards]);
  const stripe = useStripe();
  const [pmId, setPmId] = useState(defaultPm());
  const [openNewCardModal, setOpenNewCardModal] = useState(false);
  const [localError, setLocalError] = useState(paymentError);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  useEffect(() => {
    setPmId(defaultPm());
  }, [defaultPm]);

  useEffect(() => {
    if (pmId === 'add_new') {
      setOpenNewCardModal(true);
    }
  }, [pmId]);
  useEffect(() => {
    setLocalError(paymentError);
  }, [paymentError]);

  return (
    <>
      <Form
        className={className}
        loading={cardsLoading}
        onSubmit={() => createPayment({ transactionId, paymentMethodId: pmId, stripe })}
      >
        {localError && <Label basic color="red" className={styles.error_label} content={localError} />}
        <FormSelect
          options={creditCards.map(cc => (
            {
              text: `${cc.brand} * ${cc.last4} (${twoDigit(cc.expMonth)}/${cc.expYear})`,
              value: cc.id
            })).concat({ text: 'Add new...', value: 'add_new' })}
          onChange={(event, { value }) => {
            setPmId(value as string);
            setLocalError(undefined);
          }}
          value={pmId}
          error={!!localError}
        />
        <Button
          color="orange"
          fluid
          type="submit"
          content={`Pay${price ? ` ${toPrice(price)}` : ''}`}
          loading={paymentLoading}
          disabled={pmId === '' || pmId === 'add_new'}
        />
      </Form>
      <NewCardModal
        email={userEmail}
        addNewCardError={addNewCardError}
        addNewCardLoading={addNewCardLoading}
        open={openNewCardModal}
        setOpen={setOpenNewCardModal}
        addNewCard={addNewCard}
      />
    </>
  );
};

export default StripePaymentForm;
