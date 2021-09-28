import React, { useCallback, useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Icon, Step, StepContent, StepGroup } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import OrderResult from '@screens/BookingCheckout/components/OrderResult';
import { extractCheckoutStep } from '@screens/BookingCheckout/reducers';
import { connect } from 'react-redux';
import { CheckoutStep } from '@screens/BookingCheckout/model/CheckoutStep';
import { setActiveStepRoutine } from '@screens/BookingCheckout/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import BookingDetailsCheckoutStep
  from '@screens/BookingCheckout/containers/BookingCheckoutPage/BookingDetailsCheckoutStep';
import PaymentStep from '@screens/BookingCheckout/containers/BookingCheckoutPage/PaymentStep';

export interface IBookingCheckoutProps {
  step: CheckoutStep;
  setStoreStep: IBindingCallback1<CheckoutStep>;
}

const BookingCheckout: React.FC<IBookingCheckoutProps> = (
  { step, setStoreStep }
) => {
  const [activeStep, setActiveStep] = useState(step);
  const { id: bookingId } = useParams<{id: string}>();

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  // setting step to LOADING when unmount to prevent firing extra fetches before status is known
  useEffect(() => () => setStoreStep(CheckoutStep.LOADING), [setStoreStep]);

  const proceedFromDetails = useCallback(() => {
    setActiveStep(CheckoutStep.PAYMENT);
  }, []);

  return (
    <div className="content_wrapper">
      <h1 className={s.title}>Checkout</h1>
      <StepGroup className={s.steps} fluid>
        <Step
          active={activeStep === CheckoutStep.DETAILS}
          onClick={activeStep > CheckoutStep.DETAILS ? () => setActiveStep(CheckoutStep.DETAILS) : undefined}
          disabled={activeStep === CheckoutStep.LOADING || activeStep === CheckoutStep.RESULT}
        >
          <Icon name="shopping cart" color="olive" />
          <StepContent title="Details" description="Check the order details" />
        </Step>
        <Step
          active={activeStep === CheckoutStep.PAYMENT}
          disabled={activeStep === CheckoutStep.LOADING || activeStep === CheckoutStep.RESULT}
        >
          <Icon name="credit card outline" color={activeStep >= CheckoutStep.PAYMENT ? 'olive' : 'grey'} />
          <StepContent title="Payment" description="Enter billing information" />
        </Step>
        <Step
          active={activeStep === CheckoutStep.RESULT}
          disabled={activeStep !== CheckoutStep.RESULT}
        >
          <Icon name="check" color={activeStep === CheckoutStep.RESULT ? 'olive' : 'grey'} />
          <StepContent title="Order" />
        </Step>
      </StepGroup>
      <div className={s.content_container}>
        <>
          {activeStep === CheckoutStep.DETAILS && (
            <BookingDetailsCheckoutStep proceedToNextStep={proceedFromDetails} />
          )}
          {activeStep === CheckoutStep.PAYMENT && (
            <PaymentStep bookingId={bookingId} />
          )}
          {activeStep === CheckoutStep.RESULT && (
            <OrderResult />
          )}
        </>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  step: extractCheckoutStep(state)
});

const mapDispatchToProps = {
  setStoreStep: setActiveStepRoutine.fulfill
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingCheckout);
