import React from 'react';
import { Switch } from 'react-router-dom';
import Header from '@containers/Header';
import styles from './styles.module.scss';
import LandingPage from '@screens/Landing/containers/LandingPage';
import {
  userEmailActivatedRedir,
  userIsAuthenticatedRedir,
  userIsHaveRedir,
  userSelectedRole
} from '@helpers/authRules.helper';
import Footer from '@containers/Footer';
import NotFound from '@components/404NotFound';
import OAuth2Handler from '@containers/OAuth2Handler';
import EmailVerificationHandler from '@containers/EmailVerificationHandler';
import HowItWorksPage from '@screens/static/HowItWorks/containers/HowItWorksPage';
import OurStoryPage from '@screens/static/OurStory/containers/OurStoryPage';
import BrowseSpacesPage from '@screens/BrowseSpaces/containers/BrowseSpacesPage';
import BuildingDetailsPage from '@screens/BuildingDetails/containers/BuildingDetailsPage';
import { ENDPOINTS } from '@containers/Routing/endpoints';
import AppRoute from '@containers/AppRoute';
import AuthorizationRouter from '@screens/Authorization/containers/AuthorizationRouter';
import DashboardRouting from '@containers/DashboardRouting';
import BuildingEditor from '@screens/BuildingEditor/containers/BuildingEditorPage';
import SpaceEditor from '@screens/SpaceEditor/containers/SpaceEditorPage';
import BookingDetails from '@screens/BookingCheckout/containers/BookingRootPage';
import PartnerWithUsPage from '@screens/static/PartnerWithUs/containers/PartnerWithUsPage';
import JoinOurTeamPage from '@screens/static/JoinOurTeam/containers/JoinOurTeamPage';
import GetInTouchPage from '@screens/static/GetInTouch/containers/GetInTouchPage';
import ListYourSpacesPage from '@screens/static/ListYourSpaces/containers/ListYourSpacesPage';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoutingProps {
}

// eslint-disable-next-line max-len
const userValidRedir = component => userIsAuthenticatedRedir(userEmailActivatedRedir(userSelectedRole(component)));

const UserDashboard = userValidRedir(DashboardRouting);
const BookingCheckoutPage = userValidRedir(BookingDetails);
const BuildingEditorPage = userValidRedir(userIsHaveRedir(BuildingEditor));
const SpaceEditorPage = userValidRedir(userIsHaveRedir(SpaceEditor));
const ListYourSpaces = userIsAuthenticatedRedir(userEmailActivatedRedir(ListYourSpacesPage));

const {
  LOGIN, REGISTER, RESET, ROOT, BROWSE, HOW_IT_WORKS, OAUTH_REDIRECT, OUR_STORY,
  USER, VERIFY, BOOKING, DETAILS, BUILDING_EDITOR, SPACE_EDITOR, PARTNER_WITH_US, JOIN_OUR_TEAM,
  CONTACT_US, LIST_YOUR_SPACE
} = ENDPOINTS;
const blackListPaths = [LOGIN, REGISTER, RESET];

const Routing: React.FunctionComponent<IRoutingProps> = () => (
  <div className={styles.fill}>
    <Header blackListPaths={blackListPaths} />
    <div className={styles.content}>
      <Switch>
        <AppRoute exact path={ROOT} component={LandingPage} orange />
        <AppRoute exact path={[LOGIN, REGISTER, RESET]} component={AuthorizationRouter} />
        <AppRoute path={USER} component={UserDashboard} orange />
        <AppRoute exact path={OAUTH_REDIRECT} component={OAuth2Handler} />
        <AppRoute exact path={VERIFY} component={EmailVerificationHandler} />
        <AppRoute exact path={HOW_IT_WORKS} component={HowItWorksPage} />
        <AppRoute exact path={OUR_STORY} component={OurStoryPage} />
        <AppRoute exact path={PARTNER_WITH_US} component={PartnerWithUsPage} />
        <AppRoute exact path={JOIN_OUR_TEAM} component={JoinOurTeamPage} />
        <AppRoute exact path={CONTACT_US} component={GetInTouchPage} />
        <AppRoute exact path={LIST_YOUR_SPACE} component={ListYourSpaces} />
        <AppRoute exact path={BROWSE} component={BrowseSpacesPage} />
        <AppRoute exact path={DETAILS(':id')} component={BuildingDetailsPage} />
        <AppRoute exact path={BOOKING(':id')} component={BookingCheckoutPage} />
        <AppRoute exact path={BUILDING_EDITOR(':id')} component={BuildingEditorPage} />
        <AppRoute exact path={SPACE_EDITOR(':id')} component={SpaceEditorPage} />
        <AppRoute component={NotFound} orange />
      </Switch>
    </div>
    <Footer blackListPaths={blackListPaths} />
  </div>
);

export default Routing;
