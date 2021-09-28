import React, { useEffect } from 'react';
import { IBindingAction } from '@models/Callbacks';
import { connect } from 'react-redux';
import { fetchUserRoutine } from '@screens/Authorization/routines';
import FullScreenLoaderWrapper from '@components/FullScreenLoaderWrapper';
import { extractIsUserLoading, extractNeedToFetch } from '@screens/Authorization/reducers';

export interface IAuthorizationEntryProps {
  fetchUser: IBindingAction;
  loading: boolean;
  needToFetch: boolean;
}

const AuthorizationEntry: React.FC<IAuthorizationEntryProps> = (
  { fetchUser, loading, needToFetch, children }
) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <FullScreenLoaderWrapper loading={loading}>
      {!needToFetch && children}
    </FullScreenLoaderWrapper>
  );
};

const mapStateToProps = state => ({
  loading: extractIsUserLoading(state),
  needToFetch: extractNeedToFetch(state)
});

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationEntry);
