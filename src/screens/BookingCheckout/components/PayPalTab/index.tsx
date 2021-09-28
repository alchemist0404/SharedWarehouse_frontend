import React from 'react';
import styles from './styles.module.scss';
import PayPalForm, { IPayPalFormProps } from '@components/PayPalForm';
import { IBookingPaymentProps } from '@screens/BookingCheckout/model/BookingPaymentProps';

export type IPayPalTabProps = IPayPalFormProps;

const PayPalTab: React.FC<IPayPalTabProps & IBookingPaymentProps> = props => (
  <div className={styles.container}>
    <PayPalForm {...props} />
  </div>
);

export default PayPalTab;
