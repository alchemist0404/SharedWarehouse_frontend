import React from 'react';
import Tabs from '@components/Tabs';
import styles from './styles.module.scss';
import CreditCardTab, { ICreditCardTabProps } from '@screens/BookingCheckout/components/CreditCardTab';
import PayPalTab, { IPayPalTabProps } from '../PayPalTab';
import { IBookingPaymentProps } from '@screens/BookingCheckout/model/BookingPaymentProps';

export interface IPaymentEmbeddingProps {
  commonProps: IBookingPaymentProps;
  creditCardTabProps: ICreditCardTabProps;
  paypalTabProps: IPayPalTabProps;
}

const PaymentEmbedding: React.FC<IPaymentEmbeddingProps> = (
  { creditCardTabProps, paypalTabProps, commonProps }
) => (
  <>
    <Tabs
      className={styles.tabs}
      content={[
        {
          key: 1,
          name: 'Credit card',
          element: {
            Element: CreditCardTab,
            props: {
              ...commonProps,
              ...creditCardTabProps
            }
          }
        },
        {
          key: 2,
          name: 'PayPal',
          element: {
            Element: PayPalTab,
            props: {
              ...commonProps,
              ...paypalTabProps
            }
          }
        }
      ]}
    />
  </>
);

export default PaymentEmbedding;
