import { fetchPaymentRequirementsRoutine, loadCreditCardsRoutine } from '@screens/BookingCheckout/routines';
import { IPaymentRequirementResponse } from '@screens/BookingCheckout/model/PaymentRequirementResponse';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import { createReducer } from '@reduxjs/toolkit';

export interface IPaymentReducerState {
  requirements: IPaymentRequirementResponse;
  creditCards: ICreditCard[];
}

const initialState: IPaymentReducerState = {
  requirements: undefined,
  creditCards: []
};

export const paymentReducer = createReducer(initialState, {
  [fetchPaymentRequirementsRoutine.SUCCESS]: (state, { payload }) => {
    state.requirements = payload;
  },
  [loadCreditCardsRoutine.SUCCESS]: (state, { payload }) => {
    state.creditCards = payload;
  }
});

