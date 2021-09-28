import { IBindingAction } from '@root/models/Callbacks';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Message } from 'semantic-ui-react';
import { extractEmailResendError, extractEmailResendLoading, extractUserEmail } from '../../reducers';
import { resendEmailRoutine } from '../../routines';
import styles from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IActivateEmailPageProps {
  email: string;
  errorMessage: string | undefined;
  loading: boolean;
  resendMail: IBindingAction;
}

const ActivateEmailPage: React.FC<IActivateEmailPageProps> = (
  { email, errorMessage, loading, resendMail }
) => (
  <div className={styles.content_wrapper}>
    <div className={styles.container}>
      <h3 className={styles.text}>
        {'Your email is not verified yet. Please check the inbox (possibly the spam folder) '
        + `of ${email} and follow the instructions to verify it.`}
      </h3>
      <div className={styles.messageContainer}>
        {errorMessage && <Message error>{errorMessage}</Message>}
      </div>
      <Button loading={loading} onClick={resendMail}>Resend</Button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  email: extractUserEmail(state),
  errorMessage: extractEmailResendError(state),
  loading: extractEmailResendLoading(state)
});

const mapDispatchToProps = {
  resendMail: resendEmailRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivateEmailPage);
