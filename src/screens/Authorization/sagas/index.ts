import { all } from 'redux-saga/effects';
import loginPageSagas from '../containers/LoginPage/sagas';
import authorizationSagas from '../containers/AuthorizationEntry/sagas';
import registerPageSagas from '../containers/RegistrationPage/sagas';
import selectRolePageSagas from '@screens/Authorization/containers/SelectRolePage/sagas';
import forgottenPasswordPageSagas from '@screens/Authorization/containers/ForgottenPasswordPage/sagas';
import resetPasswordPageSagas from '@screens/Authorization/containers/ResetPasswordPage/sagas';
import emailActivationSagas from '@screens/Authorization/containers/ActivateEmailPage/sagas';

export default function* authSagas() {
  yield all([
    loginPageSagas(),
    authorizationSagas(),
    registerPageSagas(),
    selectRolePageSagas(),
    forgottenPasswordPageSagas(),
    resetPasswordPageSagas(),
    emailActivationSagas()
  ]);
}
