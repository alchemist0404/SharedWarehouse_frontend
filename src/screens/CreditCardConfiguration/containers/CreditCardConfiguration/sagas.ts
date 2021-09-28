import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  addNewCreditCardRoutine,
  loadCreditCardsRoutine,
  removeCardRoutine,
  setDefaultCardRoutine
} from '@screens/CreditCardConfiguration/routines';
import creditCardService from '@screens/CreditCardConfiguration/services/card.service';
import { PayloadAction } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';
import { ICreateCardRequest } from '@components/StripeAddCardForm';
import { PaymentMethod, SetupIntent, StripeError } from '@stripe/stripe-js';
import { Routine } from 'redux-saga-routines';
import { trigger } from '@helpers/sagas.helper';

export const tryLoadCreditCards = (routine: Routine) => function* loadCredits() {
  try {
    const resp = yield call(creditCardService.getCards);
    yield put(routine.success(resp));
  } catch (e) {
    toastr.error('Can\'t load credit cards', e?.message);
    yield put(routine.failure(e?.message));
  }
};

interface IStripeError {
  error?: StripeError;
}

interface IStripePMResponse extends IStripeError {
  paymentMethod?: PaymentMethod;
}

interface IStripeCardSetupResponse extends IStripeError {
  setupIntent?: SetupIntent;
}

interface IStripeIntentResponse {
  clientSecretFor3dSecure?: string;
}

export const tryAddNewCreditCard = (routine: Routine) => function* addNewCreditCard(
  { payload: { arg, stripe } }: PayloadAction<ICreateCardRequest>
) {
  try {
    const pmResp: IStripePMResponse = yield call(stripe.createPaymentMethod, arg);
    if (pmResp.error) {
      yield put(routine.failure(pmResp.error.message));
      return;
    }

    const { clientSecretFor3dSecure }: IStripeIntentResponse = yield call(
      creditCardService.addNewCard, pmResp.paymentMethod.id
    );
    if (clientSecretFor3dSecure) {
      const csResp: IStripeCardSetupResponse = yield call(stripe.confirmCardSetup, clientSecretFor3dSecure);
      if (csResp.error) { // noinspection ExceptionCaughtLocallyJS
        throw csResp.error;
      }
    }
    yield put(routine.success());
    toastr.success('Success', 'Credit card added');
  } catch (e) {
    toastr.error('Can\'t add new card', e?.message);
    yield put(routine.failure(e?.message));
  }
};

function* trySetDefaultCard({ payload: pmId }: PayloadAction<string>) {
  try {
    yield call(creditCardService.setDefault, pmId);
    yield put(setDefaultCardRoutine.success(pmId));
  } catch (e) {
    toastr.error('Can\'t set card as default', e?.message);
    yield put(setDefaultCardRoutine.failure(e?.message));
  }
}

function* tryRemoveCard({ payload: pmId }: PayloadAction<string>) {
  try {
    yield call(creditCardService.removeCard, pmId);
    yield put(removeCardRoutine.success(pmId));
    toastr.success('Success', 'Credit card removed');
  } catch (e) {
    toastr.error('Can\'t remove card', e?.message);
    yield put(removeCardRoutine.failure(e?.message));
  }
}

export default function* creditCardConfigurationPageSagas() {
  yield all([
    yield takeEvery(loadCreditCardsRoutine.TRIGGER, tryLoadCreditCards(loadCreditCardsRoutine)),
    yield takeEvery(addNewCreditCardRoutine.TRIGGER, tryAddNewCreditCard(addNewCreditCardRoutine)),
    yield takeEvery(setDefaultCardRoutine.TRIGGER, trySetDefaultCard),
    yield takeEvery(removeCardRoutine.TRIGGER, tryRemoveCard),
    yield takeEvery(addNewCreditCardRoutine.SUCCESS, trigger(loadCreditCardsRoutine))
  ]);
}
