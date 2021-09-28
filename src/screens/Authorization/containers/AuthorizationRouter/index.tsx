import React from 'react';
import AuthPageTemplate from '@screens/Authorization/components/AuthPageTemplate';
import { Switch } from 'react-router-dom';
import AppRoute from '@containers/AppRoute';
import ResetPasswordHandler from '@containers/ResetPasswordHandler';
import { userIsNotAuthenticatedRedir } from '@helpers/authRules.helper';
import LoginPage from '@screens/Authorization/containers/LoginPage';
import RegistrationPage from '@screens/Authorization/containers/RegistrationPage';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const Login = userIsNotAuthenticatedRedir(LoginPage);
const Registration = userIsNotAuthenticatedRedir(RegistrationPage);

const {
  LOGIN, REGISTER, RESET
} = ENDPOINTS;

const AuthorizationRouter: React.FC = () => (
  <AuthPageTemplate>
    <Switch>
      <AppRoute exact path={LOGIN} component={Login} />
      <AppRoute exact path={REGISTER} component={Registration} />
      <AppRoute exact path={RESET} component={ResetPasswordHandler} />
    </Switch>
  </AuthPageTemplate>
);

export default AuthorizationRouter;
