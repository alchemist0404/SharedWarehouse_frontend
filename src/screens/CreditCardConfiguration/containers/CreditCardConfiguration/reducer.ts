import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICreditCard } from '@screens/CreditCardConfiguration/model/CreditCard';
import {
  loadCreditCardsRoutine,
  removeCardRoutine,
  setDefaultCardRoutine
} from '@screens/CreditCardConfiguration/routines';

export interface ICreditCardConfigurationReducerState {
  creditCards: ICreditCard[];
}

const initialState: ICreditCardConfigurationReducerState = {
  creditCards: []
};

export const creditCardConfigurationReducer = createReducer(initialState, {
  [loadCreditCardsRoutine.SUCCESS]: (state, { payload }: PayloadAction<ICreditCard[]>) => {
    state.creditCards = payload;
  },
  [setDefaultCardRoutine.SUCCESS]: (state, { payload: pmId }: PayloadAction<string>) => {
    state.creditCards.forEach(cc => {
      cc.primary = cc.id === pmId;
    });
  },
  [removeCardRoutine.SUCCESS]: (state, { payload: pmId }: PayloadAction<string>) => {
    const index = state.creditCards.findIndex(cc => cc.id === pmId);
    state.creditCards.splice(index, 1);
  }
});
