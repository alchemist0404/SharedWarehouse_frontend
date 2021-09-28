import React, { useCallback } from 'react';
import { Divider } from 'semantic-ui-react';
import styles from '../common.module.scss';
import { Link } from 'react-router-dom';
import LoginForm from '@screens/Authorization/components/LoginForm';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { ILoginData } from '@screens/Authorization/models/LoginData';
import { logInRoutine } from '@screens/Authorization/routines';
import { isLoginLoading } from '@screens/Authorization/reducers';
import SocialAuthForm from '@screens/Authorization/components/SocialAuthForm';

export interface ILoginPageProps {
  logIn: IBindingCallback1<ILoginData>;
  loginLoading: boolean;
}

const LoginPage: React.FC<ILoginPageProps> = ({ logIn, loginLoading }) => {
  const loginCallback = useCallback((loginData: ILoginData) => {
    logIn(loginData);
  }, [logIn]);

  return (
    <>
      <LoginForm onLoginClick={loginCallback} loginLoading={loginLoading} />
      <Divider horizontal>Or</Divider>
      <SocialAuthForm />
      <div className={styles.alternative_container}>
        <span>
          New to us?&nbsp;
          <Link to="/register">Register</Link>
        </span>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  loginLoading: isLoginLoading(state)
});

const mapDispatchToProps = {
  logIn: logInRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
