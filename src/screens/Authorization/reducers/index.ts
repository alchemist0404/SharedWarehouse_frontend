/* eslint-disable max-len */
import { combineReducers } from 'redux';
import {
  logInRoutine,
  registerRoutine,
  resendEmailRoutine,
  resetPasswordRoutine,
  selectRolesRoutine,
  sendResetPasswordRoutine,
  verifyEmailActivationRoutine
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { currentUserReducer } from '@screens/Authorization/containers/reducer';
import { RootState } from '@root/store';

const requests = combineReducers({
  logInRequest: reducerCreator([logInRoutine.TRIGGER]),
  registerRequest: reducerCreator([registerRoutine.TRIGGER]),
  sendEmailRequest: reducerCreator([resendEmailRoutine.TRIGGER]),
  verifyEmailRequest: reducerCreator([verifyEmailActivationRoutine.TRIGGER]),
  selectRolesRequest: reducerCreator([selectRolesRoutine.TRIGGER]),
  sendResetPasswordRequest: reducerCreator([sendResetPasswordRoutine.TRIGGER]),
  resetPasswordRequest: reducerCreator([resetPasswordRoutine.TRIGGER])
});

const data = combineReducers({
  currentUser: currentUserReducer
});

export default combineReducers({
  data,
  requests
});

const userReducer = (state: RootState) => state.auth.data.currentUser;
const reqs = (state: RootState) => state.auth.requests;

export const isLoginLoading: (state) => boolean = state => reqs(state).logInRequest.loading;
export const isRegisterLoading: (state) => boolean = state => reqs(state).registerRequest.loading;

export const extractIsUserLoggedIn = state => userReducer(state).user?.email !== undefined;
export const extractIsUserVerified = state => userReducer(state).user?.emailVerified;
export const extractUserRoles = state => userReducer(state).user?.roles || [];
export const extractIsUserLoading = state => userReducer(state).loading;
export const extractCurrentUser = state => userReducer(state).user;
export const extractUserEmail = state => userReducer(state).user.email;
export const extractNeedToFetch = state => userReducer(state).needToFetch;

export const extractEmailResendError = state => reqs(state).sendEmailRequest.error;
export const extractEmailResendLoading = state => reqs(state).sendEmailRequest.loading;

export const extractEmailValidationError = state => reqs(state).verifyEmailRequest.error;
export const extractEmailValidationLoading = state => reqs(state).verifyEmailRequest.loading;

export const extractRoleSelectionLoading = state => reqs(state).selectRolesRequest.loading;
export const extractRoleSelectionError = state => reqs(state).selectRolesRequest.error;

export const extractSendResetPasswordLoading = state => reqs(state).sendResetPasswordRequest.loading;
export const extractSendResetPasswordError = state => reqs(state).sendResetPasswordRequest.error;

export const extractResetPasswordLoading = state => reqs(state).resetPasswordRequest.loading;
export const extractResetPasswordError = state => reqs(state).resetPasswordRequest.error;
