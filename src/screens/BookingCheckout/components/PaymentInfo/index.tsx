import React from 'react';
import { toPrice } from '@helpers/price.helper';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';

export interface IPaymentInfoProps {
  paymentRequirements: IPaymentRequirementResponse;
}

const PaymentInfo: React.FC<IPaymentInfoProps> = ({ paymentRequirements }) => {
  let nextPayment: IPaymentRequirementResponse;
  if (paymentRequirements) {
    nextPayment = paymentRequirements.nextPayment;
  }

  return (
    <div style={{ marginBottom: '1.5em' }}>
      Payment info:
      <br />
      {`Paid period: ${paymentRequirements.dateFrom} - ${paymentRequirements.dateTo} `
      + `(you pay for ${paymentRequirements.days} day(s))`}
      <br />
      {`Payment sum: ${toPrice(paymentRequirements.priceSummary.sumToPay)}`}
      <br />
      Spaces:
      <br />
      {paymentRequirements.priceSummary.pricesToSpaces.map(priceSpaces => (
        <React.Fragment key={priceSpaces.spaceTemplate.alias}>
          {`'${priceSpaces.spaceTemplate.alias}' x${priceSpaces.spaces}: `
          + `${toPrice(priceSpaces.pricePerDay)} per day;`
          + ` ${toPrice(priceSpaces.pricePerPeriod)} per period`}
          <br />
        </React.Fragment>
      ))}
      {nextPayment && (
        <span style={{ color: 'orange' }}>
          {`*The next payment is expected to be ${nextPayment.priceSummary.sumToPay.amount} `
          + `${nextPayment.priceSummary.sumToPay.currency} (${nextPayment.dateFrom} - ${nextPayment.dateTo})`}
        </span>
      )}
    </div>
  );
};

export default PaymentInfo;
