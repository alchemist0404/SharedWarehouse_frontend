import React, { useCallback } from 'react';
import { Divider } from 'semantic-ui-react';
import styles from '../common.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import { registerRoutine } from '@screens/Authorization/routines';
import { isRegisterLoading } from '@screens/Authorization/reducers';
import RegistrationForm from '@screens/Authorization/components/RegistrationForm';
import { IRegistrationData } from '@screens/Authorization/models/RegistrationData';
import SocialAuthForm from '@screens/Authorization/components/SocialAuthForm';

export interface IRegistrationPageProps {
  register: IBindingCallback1<IRegistrationData>;
  registerLoading: boolean;
}

const RegistrationPage: React.FC<IRegistrationPageProps> = ({ register, registerLoading }) => {
  const registerCallback = useCallback((registrationData: IRegistrationData) => {
    register(registrationData);
  }, [register]);

  return (
    <>
      <RegistrationForm onRegisterClick={registerCallback} registrationLoading={registerLoading} />
      <Divider className={styles.main_container__divider} horizontal>Or</Divider>
      <SocialAuthForm />
      <div className={styles.alternative_container}>
        <span>
          Already registered?&nbsp;
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  registerLoading: isRegisterLoading(state)
});

const mapDispatchToProps = {
  register: registerRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
