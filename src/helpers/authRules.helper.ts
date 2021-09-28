import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import Loading from '@components/FullScreenLoaderWrapper/index';
import {
  extractCurrentUser,
  extractIsUserLoading,
  extractIsUserLoggedIn,
  extractIsUserVerified,
  extractUserRoles
} from '@screens/Authorization/reducers';
import { Role } from '@screens/Authorization/models/Roles';
import ActivateEmailPage from '@screens/Authorization/containers/ActivateEmailPage';
import SelectRolePage from '@screens/Authorization/containers/SelectRolePage';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const locationHelper = locationHelperBuilder({});

const userHasRoleSelector = (role: Role) => state => extractIsUserLoggedIn(state)
  && extractUserRoles(state).find(actualRole => actualRole === role) !== undefined;

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => extractIsUserLoggedIn(state),
  authenticatingSelector: state => extractIsUserLoading(state),
  wrapperDisplayName: 'UserIsAuthenticated'
};

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults);

const { LOGIN, ROOT, USER } = ENDPOINTS;

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: LOGIN
});

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: ROOT,
  allowRedirectBack: false,
  authenticatedSelector: userHasRoleSelector(Role.ADMIN),
  wrapperDisplayName: 'UserIsAdmin'
});

export const userIsHaveRedir = connectedRouterRedirect({
  redirectPath: ROOT,
  authenticatedSelector: userHasRoleSelector(Role.HAVE),
  wrapperDisplayName: 'UserIsHave'
});

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => !extractIsUserLoggedIn(state) && !extractIsUserLoading(state),
  wrapperDisplayName: 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || USER,
  allowRedirectBack: false
});

export const userEmailActivatedRedir = connectedAuthWrapper({
  authenticatedSelector: state => extractIsUserVerified(state),
  wrapperDisplayName: 'UserIsVerified',
  FailureComponent: ActivateEmailPage
});

export const userSelectedRole = connectedAuthWrapper({
  authenticatedSelector: state => extractUserRoles(state).length !== 0,
  wrapperDisplayName: 'UserHasRoles',
  FailureComponent: SelectRolePage
});

export const visibleToSpecificHave = ownerId => connectedAuthWrapper({
  authenticatedSelector: state => userHasRoleSelector(Role.HAVE)(state) && extractCurrentUser(state).id === ownerId,
  wrapperDisplayName: 'OnlyForSpecificUser'
});
