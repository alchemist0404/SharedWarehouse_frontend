/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { IBookingPaymentProps } from '@screens/BookingCheckout/model/BookingPaymentProps';
import { env } from '@root/env';
import { Loader } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';

export interface IPayPalFormProps {
  createPayment: IBindingCallback1<IPaypalPaymentRequest>;
  paymentLoading: boolean;
  paymentError?: string;
}

interface IPaypalPaymentRequest {
  orderId: string;
  transactionId: string;
}

const PayPalForm: React.FC<IPayPalFormProps & IBookingPaymentProps> = (
  { price, transactionId, createPayment, paymentLoading }
) => {
  const [buttonLoaded, setButtonLoaded] = useState(false);
  const visibility = (paymentLoading || !buttonLoaded) ? 'hidden' : 'unset';

  return (
    <>
      {(paymentLoading || !buttonLoaded) && (<Loader active />)}
      <div style={{ visibility }}>
        <PayPalButton
          onButtonReady={() => {
            setButtonLoaded(true);
          }}
          style={{
            color: 'blue',
            label: 'pay'
          }}
          createOrder={(data, actions) => actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: price.currency,
                value: price.amount
              }
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING' // default is "GET_FROM_FILE"
            }
          })}
          onApprove={data => {
            createPayment({ orderId: data.orderID, transactionId });
          }}
          options={{
            clientId: env.paypalClientId
          }}
        />
      </div>
    </>
  );
};

export default PayPalForm;
