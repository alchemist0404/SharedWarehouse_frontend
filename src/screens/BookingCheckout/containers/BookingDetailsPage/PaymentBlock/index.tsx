import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { IBindingCallback1 } from '@models/Callbacks';
import { fetchPaymentRequirementsRoutine } from '@screens/BookingCheckout/routines';
import { extractFetchPaymentRequirementsLoading, extractPaymentRequirements } from '@screens/BookingCheckout/reducers';
import { connect } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import PaymentModal from './PaymentModal';

export interface IPaymentBlockProps extends IState, IActions {
  bookingId: string;
}

interface IState {
  paymentRequirementsLoading: boolean;
  paymentRequirements: IPaymentRequirementResponse;
}

interface IActions {
  fetchPaymentRequirements: IBindingCallback1<string>;
}

const PaymentBlock: React.FC<IPaymentBlockProps> = (
  { bookingId, paymentRequirementsLoading, paymentRequirements, fetchPaymentRequirements }
) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  useEffect(() => {
    if (bookingId) {
      fetchPaymentRequirements(bookingId);
    }
  }, [bookingId, fetchPaymentRequirements]);

  return (
    <>
      <PaymentModal
        modalOpen={paymentOpen}
        setModalOpen={setPaymentOpen}
        paymentRequirements={paymentRequirements}
      />
      <h4 className={styles.payment_title}>PAYMENT PERIODS</h4>
      {paymentRequirementsLoading || !paymentRequirements ? <Loader active inline="centered" />
        : (
          <>
            {paymentRequirements.priceSummary ? (
              <>
                {paymentRequirements && (
                  <h3 className={styles.payment_statement}>
                    {`Next payment period: ${paymentRequirements.dateFrom} - ${paymentRequirements.dateTo}`}
                  </h3>
                )}
                <Button
                  color="orange"
                  content="Pay for the next period"
                  onClick={() => setPaymentOpen(true)}
                />
              </>
            ) : (
              <p>Next payment period has been paid already</p>
            )}
          </>
        )}
    </>
  );
};

const mapStateToProps: (state) => IState = state => ({
  paymentRequirements: extractPaymentRequirements(state),
  paymentRequirementsLoading: extractFetchPaymentRequirementsLoading(state)
});

const mapDispatchToProps = {
  fetchPaymentRequirements: fetchPaymentRequirementsRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBlock);
