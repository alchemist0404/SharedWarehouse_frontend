import React from 'react';
import s from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep/styles.module.scss';
import { toPrice } from '@helpers/price.helper';
import { ISpaceBooked } from '@screens/BookingCheckout/model/BookingCheckout';
import { IPriceWithCurrency } from '@screens/UserMain/model/Booking';

export interface ICostEstimationProps {
  spaces: ISpaceBooked[];
  bookingCostPerDay?: IPriceWithCurrency;
}

const CostEstimation: React.FC<ICostEstimationProps> = ({ spaces, bookingCostPerDay }) => (
  <div className={s.details__cost_estimation}>
    <h4 className={s.details__small_label}>ESTIMATED COST</h4>
    <h4 className={s.details__small_label}>PER MONTH (30 days)</h4>
    {spaces.map(sp => (
      <React.Fragment key={sp.id}>
        <h3>{`${sp.amountBooked} ${sp.alias}`}</h3>
        <h3 key={sp.id} className={s.details__cost_label}>
          {`${toPrice(sp.amountBooked * sp.pricePerDay * 30)} ${sp.currency}`}
        </h3>
      </React.Fragment>
    ))}
    {bookingCostPerDay && (
      <>
        <h3 className={s.details__cost_total_label}><b>Monthly total (30 days):</b></h3>
        <h3 className={s.details__cost_total_label}>
          <b>
            {`${toPrice(bookingCostPerDay.amount * 30)} ${bookingCostPerDay.currency}`}
          </b>
        </h3>
      </>
    )}
  </div>
);

export default CostEstimation;
