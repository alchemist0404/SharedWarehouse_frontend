import React, { useState } from 'react';
import { Button, Divider, Form, FormInput, Header, Message } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { history } from '@helpers/history.helper';
import { connect } from 'react-redux';
import { extractSendResetPasswordError, extractSendResetPasswordLoading } from '@screens/Authorization/reducers';
import { IBindingCallback1 } from '@models/Callbacks';
import { sendResetPasswordRoutine } from '@screens/Authorization/routines';

export interface IForgottenPasswordPageProps {
  requestLoading: boolean;
  errorMessage: string;
  sendResetPassword: IBindingCallback1<string>;
}

const ForgottenPasswordPage: React.FC<IForgottenPasswordPageProps> = (
  { requestLoading, errorMessage, sendResetPassword }
) => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = e => {
    e.preventDefault();
    sendResetPassword(email);
  };

  return (
    <>
      <Header>Restore the password</Header>
      <Divider />
      {errorMessage && <Message error>{errorMessage}</Message>}
      <p className={styles.text}>
        Forgot your password?  No sweat!
        <br />
        Please enter your email address below, and we will send you password reset instructions:
      </p>
      <Form onSubmit={handleSubmit}>
        <FormInput
          autoFocus
          icon="at"
          type="email"
          iconPosition="left"
          required
          placeholder="example@mail.com"
          value={email}
          onChange={((ev, { value }) => setEmail(value))}
        />
        <div className={styles.form_buttons}>
          <Button color="orange" type="submit" loading={requestLoading}>Send</Button>
          <Button basic color="black" onClick={history.goBack}>Back</Button>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = state => ({
  requestLoading: extractSendResetPasswordLoading(state),
  errorMessage: extractSendResetPasswordError(state)
});

const mapDispatchToProps = {
  sendResetPassword: sendResetPasswordRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPasswordPage);
