/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createCreditCardConfigurationRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`CREDIT_CARD_CONFIGURATION:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
export const removeCardRoutine = createCreditCardConfigurationRoutine<string>('REMOVE_CARD');
export const setDefaultCardRoutine = createCreditCardConfigurationRoutine<string>('SET_DEFAULT_CARD');
export const addNewCreditCardRoutine = createCreditCardConfigurationRoutine('ADD_NEW_CREDIT_CARD');
export const loadCreditCardsRoutine = createCreditCardConfigurationRoutine('LOAD_CREDIT_CARDS');
