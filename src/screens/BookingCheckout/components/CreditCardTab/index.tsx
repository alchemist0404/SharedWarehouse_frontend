import React from 'react';
import StripePaymentForm, { IStripeFormProps } from '@components/StripePaymentForm';
import styles from './styles.module.scss';
import { IBookingPaymentProps } from '@screens/BookingCheckout/model/BookingPaymentProps';

export type ICreditCardTabProps = IStripeFormProps;

const CreditCardTab: React.FC<ICreditCardTabProps & IBookingPaymentProps> = props => (
  <div className={styles.form}>
    <StripePaymentForm {...props} />
  </div>
);

export default CreditCardTab;
