import { createRoutine } from 'redux-saga-routines';

const createAuthRoutine = actionName => createRoutine(`AUTH:${actionName}`);

export const logInRoutine = createAuthRoutine('LOG_IN');
export const logOutRoutine = createAuthRoutine('LOG_OUT');
export const fetchUserRoutine = createAuthRoutine('FETCH_USER');
export const syncUserRoutine = createAuthRoutine('SYNC_USER');

export const registerRoutine = createAuthRoutine('REGISTER');
export const resendEmailRoutine = createAuthRoutine('RESEND_EMAIL');
export const verifyEmailActivationRoutine = createAuthRoutine('VERIFY_EMAIL_ACTIVATION');

export const selectRolesRoutine = createAuthRoutine('SELECT_ROLES');

export const sendResetPasswordRoutine = createAuthRoutine('SEND_RESET_PASSWORD');
export const resetPasswordRoutine = createAuthRoutine('RESET_PASSWORD');
