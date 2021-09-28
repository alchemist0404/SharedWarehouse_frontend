import React from 'react';
import { connect } from 'react-redux';
import { extractLocationQuery } from '@helpers/url.helper';
import ResetPasswordPage from '@screens/Authorization/containers/ResetPasswordPage';
import ForgottenPasswordPage from '@screens/Authorization/containers/ForgottenPasswordPage';

export interface IResetPasswordHandlerProps {
  email: string;
  code: string;
}

const ResetPasswordHandler: React.FC<IResetPasswordHandlerProps> = (
  { email, code }
) => (
  <>
    {(email && code) ? (
      <ResetPasswordPage />
    ) : (
      <ForgottenPasswordPage />
    )}
  </>
);

const mapStateToProps = state => ({
  email: extractLocationQuery(state).email,
  code: extractLocationQuery(state).code
});

export default connect(mapStateToProps, null)(ResetPasswordHandler);
