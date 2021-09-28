import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { setTokens } from '@screens/Authorization/services/tokens.service';
import { extractLocationQuery } from '@helpers/url.helper';
import { fetchUserRoutine } from '@screens/Authorization/routines';
import { IBindingAction } from '@models/Callbacks';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import { connect } from 'react-redux';

export interface IOAuth2HandlerProps {
  accessToken: string;
  refreshToken: string;
  error: string;
  fetchUser: IBindingAction;
}

const OAuth2Handler: React.FC<IOAuth2HandlerProps> = ({ accessToken, refreshToken, error, fetchUser }) => {
  useEffect(() => {
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    }
    fetchUser();
  }, [accessToken, refreshToken, fetchUser]);

  return (
    accessToken && refreshToken
      ? (
        <Redirect to={ENDPOINTS.ROOT} />
      )
      : (
        <Redirect to={{
          pathname: ENDPOINTS.LOGIN,
          state: { error }
        }}
        />
      )
  );
};

const mapStateToProps = state => ({
  accessToken: extractLocationQuery(state).token,
  refreshToken: extractLocationQuery(state).refresh,
  error: extractLocationQuery(state).error
});

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(OAuth2Handler);
