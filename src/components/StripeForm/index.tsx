import React, { useEffect, useState } from 'react';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { IBindingCallback2 } from '@models/Callbacks';
import { isEmpty } from 'lodash';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Form, Label } from 'semantic-ui-react';
import styles from './styles.module.scss';
import ErrorPopup from '@components/FormErrorPopup';

export interface IRawStripeFormProps {
  onSubmit: IBindingCallback2<Stripe, StripeElements>;
  submitLoading: boolean;
  className?: string;
  error?: string;
  submitLabel: string;
}

const options = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4'
      },
      fontFamily: 'Source Code Pro, monospace'
    },
    invalid: {
      '::placeholder': {
        color: '#9e2146'
      }
    }
  }
};

const RawStripeForm: React.FC<IRawStripeFormProps> = (
  { onSubmit, submitLoading, className, error, submitLabel }
) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState({ number: undefined, cvc: undefined, expiry: undefined });
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const { cvc, number, expiry } = errors;
    setErrored(!isEmpty(cvc) || !isEmpty(number) || !isEmpty(expiry));
  }, [errors]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    onSubmit(stripe, elements);
  };

  return (
    <Form onSubmit={handleSubmit} className={`${styles.form} ${className || ''}`} loading={!elements || !stripe}>
      {error && <Label color="red" basic content={error} />}
      <ErrorPopup
        open={!isEmpty(errors.number)}
        label={errors.number}
        component={(
          <CardNumberElement
            options={options}
            onChange={value => setErrors(prev => ({ ...prev, number: value.error?.message }))}
          />
        )}
      />
      <div className={styles.card_misc}>
        <ErrorPopup
          open={!isEmpty(errors.expiry)}
          label={errors.expiry}
          position="left center"
          component={(
            <CardExpiryElement
              options={options}
              onChange={value => setErrors(prev => ({ ...prev, expiry: value.error?.message }))}
            />
          )}
        />
        <ErrorPopup
          open={!isEmpty(errors.cvc)}
          label={errors.cvc}
          component={(
            <CardCvcElement
              options={options}
              onChange={value => setErrors(prev => ({ ...prev, cvc: value.error?.message }))}
            />
          )}
        />
      </div>
      <Button
        className={styles.button}
        color="orange"
        type="submit"
        disabled={!elements || !stripe || errored}
        content={submitLabel}
        loading={submitLoading}
      />
    </Form>
  );
};

export default RawStripeForm;
