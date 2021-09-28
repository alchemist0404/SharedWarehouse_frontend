import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { extractLocationQuery } from '@helpers/url.helper';
import { IBindingCallback1 } from '@models/Callbacks';
import { verifyEmailActivationRoutine } from '@screens/Authorization/routines';
import { IEmailActivationData } from '@screens/Authorization/models/EmailActivationData';
import FullScreenLoaderWrapper from '@components/FullScreenLoaderWrapper';
import { extractEmailValidationError, extractEmailValidationLoading } from '@screens/Authorization/reducers';
import StatusTemplate from '@components/StatusTemplate';

export interface IEmailVerificationHandlerProps {
  code: string;
  email: string;
  loading: boolean;
  errorMessage: string;
  verifyEmail: IBindingCallback1<IEmailActivationData>;
}

const EmailVerificationHandler: React.FC<IEmailVerificationHandlerProps> = (
  { code, email, verifyEmail, loading, errorMessage }
) => {
  useEffect(() => {
    verifyEmail({ code, email });
  }, [code, email, verifyEmail]);

  return (
    <FullScreenLoaderWrapper loading={loading} loadingText="Verifying email">
      {errorMessage ? (
        <StatusTemplate isSuccess={false} statusText={errorMessage} />
      ) : (
        <StatusTemplate isSuccess statusText="Email activated successfully" />
      )}
    </FullScreenLoaderWrapper>
  );
};

const mapStateToProps = state => ({
  code: extractLocationQuery(state).code,
  email: extractLocationQuery(state).email,
  loading: extractEmailValidationLoading(state),
  errorMessage: extractEmailValidationError(state)
});

const mapDispatchToProps = {
  verifyEmail: verifyEmailActivationRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationHandler);
