import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { extractResetPasswordError, extractResetPasswordLoading } from '@screens/Authorization/reducers';
import { resetPasswordRoutine } from '@screens/Authorization/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import { IResetPasswordData } from '@screens/Authorization/models/ResetPasswordVerificationData';
import { Divider, Header, Message } from 'semantic-ui-react';
import { extractLocationQuery } from '@helpers/url.helper';
import styles from './styles.module.scss';
import ResetPasswordForm from '@screens/Authorization/components/ResetPasswordForm';

export interface IResetPasswordPageProps {
  email: string;
  code: string;
  loading: boolean;
  error: string;
  resetPassword: IBindingCallback1<IResetPasswordData>;
}

const ResetPasswordPage: React.FC<IResetPasswordPageProps> = (
  { email, code, loading, error, resetPassword }
) => {
  const handlePasswordReset = useCallback((password: string) => {
    resetPassword({ code, email, password });
  }, [code, email, resetPassword]);

  return (
    <>
      <Header>Reset password</Header>
      <Divider />
      {error && <Message error>{error}</Message>}
      <p className={styles.text}>
        By submitting this form, you will set your new password for email&nbsp;
        <b>{email}</b>
      </p>
      <ResetPasswordForm onResetClick={handlePasswordReset} resetLoading={loading} />
    </>
  );
};

const mapStateToProps = state => ({
  email: extractLocationQuery(state).email,
  code: extractLocationQuery(state).code,
  loading: extractResetPasswordLoading(state),
  error: extractResetPasswordError(state)
});

const mapDispatchToProps = {
  resetPassword: resetPasswordRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
