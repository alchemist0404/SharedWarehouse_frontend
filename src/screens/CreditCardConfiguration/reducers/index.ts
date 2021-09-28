import { combineReducers } from 'redux';
import { RootState } from '@root/store';
import { reducerCreator } from '@helpers/reducer.helper';
import { creditCardConfigurationReducer } from '@screens/CreditCardConfiguration/containers/CreditCardConfiguration/reducer';
/* PlopJS import placeholder. Do not remove */
import {
  addNewCreditCardRoutine,
  loadCreditCardsRoutine,
  removeCardRoutine,
  setDefaultCardRoutine
} from '@screens/CreditCardConfiguration/routines';

const requests = combineReducers({
  /* PlopJS request placeholder. Do not remove */
  removeCardRequest: reducerCreator([removeCardRoutine.TRIGGER]),
  setDefaultCardRequest: reducerCreator([setDefaultCardRoutine.TRIGGER]),
  addNewCreditCardRequest: reducerCreator([addNewCreditCardRoutine.TRIGGER]),
  loadCreditCardsRequest: reducerCreator([loadCreditCardsRoutine.TRIGGER])
});

export default combineReducers({
  requests,
  data: creditCardConfigurationReducer
});

const reqs = (state: RootState) => state.creditCardConfiguration.requests;
const data = (state: RootState) => state.creditCardConfiguration.data;

export const extractCreditCards = state => data(state).creditCards;

/* PlopJS request_extractor placeholder. Do not remove */
export const extractRemoveCardLoading = state => reqs(state).removeCardRequest.loading;
export const extractRemoveCardError = state => reqs(state).removeCardRequest.error;
export const extractSetDefaultCardLoading = state => reqs(state).setDefaultCardRequest.loading;
export const extractSetDefaultCardError = state => reqs(state).setDefaultCardRequest.error;
export const extractAddNewCreditCardLoading = state => reqs(state).addNewCreditCardRequest.loading;
export const extractAddNewCreditCardError = state => reqs(state).addNewCreditCardRequest.error;
export const extractLoadCreditCardsLoading = state => reqs(state).loadCreditCardsRequest.loading;
