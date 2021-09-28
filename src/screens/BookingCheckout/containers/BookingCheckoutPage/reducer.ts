import { CheckoutStep } from '@screens/BookingCheckout/model/CheckoutStep';
import { loadBookingDetailsRoutine, setActiveStepRoutine } from '@screens/BookingCheckout/routines';
import { BookingStatus } from '@models/domain/BookingStatus';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IBookingCheckoutData } from '@screens/BookingCheckout/model/BookingCheckout';

export interface IBookingCheckoutReducerState {
  step: CheckoutStep;
}

const initialState: IBookingCheckoutReducerState = {
  step: CheckoutStep.LOADING
};

function stepFromBookingStatus(status: BookingStatus) {
  switch (status) {
    case BookingStatus.PENDING:
      return CheckoutStep.DETAILS;
    case BookingStatus.CONFIRMED:
    case BookingStatus.CANCELLED:
      return CheckoutStep.RESULT;
    default:
      return CheckoutStep.LOADING;
  }
}

export const bookingCheckoutReducer = createReducer(initialState, {
  [setActiveStepRoutine.FULFILL]: (state, { payload }: PayloadAction<CheckoutStep>) => {
    state.step = payload;
  },
  [loadBookingDetailsRoutine.SUCCESS]: (state, { payload }: PayloadAction<IBookingCheckoutData>) => {
    state.step = stepFromBookingStatus(payload.booking.booking.status);
  }
});
