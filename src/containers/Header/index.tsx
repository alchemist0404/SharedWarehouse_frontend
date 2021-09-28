import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { IBindingAction } from '@models/Callbacks';
import { logOutRoutine } from '@screens/Authorization/routines';
import { extractIsUserLoggedIn, extractUserRoles } from '@screens/Authorization/reducers';
import { Dropdown, Icon } from 'semantic-ui-react';
import { extractLocationPathname } from '@helpers/url.helper';
import HorizontalLogo from '@components/logos/HorizontalLetters';
import { extractIsFooterOrange } from '@containers/AppRoute/reducer';
import classNames from 'classnames';
import { Role } from '@screens/Authorization/models/Roles';
import { HAVES_DASHBOARD_ENDPOINTS } from '@screens/HavesDashboard/Root/components/Routing/endpoints';
import { NEEDS_DASHBOARD_ENDPOINTS } from '@screens/NeedsDashboard/Root/components/Routing/endpoints';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const linksAboutAs = [
  ENDPOINTS.PARTNER_WITH_US,
  ENDPOINTS.JOIN_OUR_TEAM,
  ENDPOINTS.OUR_STORY,
  ENDPOINTS.CONTACT_US
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IHeaderProps {
  loggedIn: boolean;
  logOut: IBindingAction;
  hidden: boolean;
  blackListPaths: string[];
  orange?: boolean;
  stompClient: any;
}

const Header: React.FC<IHeaderProps> = ({ loggedIn, logOut, hidden, orange, stompClient }) => {
  const handleLogOut = () => logOut();
  const role = useSelector(extractUserRoles)[0];
  const location = useLocation();
  const [isSelectedAboutUs, setIsSelectedAboutUs] = useState<boolean>(false);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      stompClient.subscribe('/socket/newUser', data => { console.log(data.body); });
    }
  }, [stompClient]);

  useEffect(() => {
    setIsSelectedAboutUs(linksAboutAs.some(link => link === location.pathname));
  }, [location.pathname]);

  return (
    <>
      {hidden ? null : (
        <>
          <div className={styles.container} id="navbar">
            <div className={`${styles.wrapper} content_wrapper`}>
              <div className={styles.left_group}>
                <NavLink
                  exact
                  to={ENDPOINTS.BROWSE}
                  className={styles.link}
                  activeClassName={styles.boldLink}
                >
                  Browse Spaces
                </NavLink>
                {role === Role.HAVE && (
                  <NavLink
                    to={HAVES_DASHBOARD_ENDPOINTS.BUILDINGS}
                    className={styles.link}
                    activeClassName={styles.boldLink}
                  >
                    List Your Space
                  </NavLink>
                )}
                {role === Role.NEED && (
                  <NavLink
                    to={NEEDS_DASHBOARD_ENDPOINTS.SPACES}
                    className={styles.link}
                    activeClassName={styles.boldLink}
                  >
                    List Your Space
                  </NavLink>
                )}
                {(!loggedIn || !role) && (
                <NavLink
                  to={ENDPOINTS.LIST_YOUR_SPACE}
                  className={styles.link}
                  activeClassName={styles.boldLink}
                >
                  List Your Space
                </NavLink>
                )}
              </div>
              <div className={styles.center_group}>
                <Link to={ENDPOINTS.ROOT} className={styles.horizontal_logo_link}>
                  <HorizontalLogo className={styles.logo} />
                </Link>
              </div>
              <div className={styles.right_group}>
                <NavLink
                  to={ENDPOINTS.HOW_IT_WORKS}
                  className={styles.link}
                  activeClassName={styles.boldLink}
                >
                  How it Works
                </NavLink>
                <Dropdown
                  item
                  text="About Us"
                  icon={null}
                  className={isSelectedAboutUs ? classNames(styles.link, styles.boldLink) : classNames(styles.link)}
                >
                  <Dropdown.Menu>
                    <NavLink to={ENDPOINTS.PARTNER_WITH_US} className={styles.subLink}>
                      Partner with Us
                    </NavLink>
                    <NavLink to={ENDPOINTS.JOIN_OUR_TEAM} className={styles.subLink}>
                      Join our Team
                    </NavLink>
                    <NavLink to={ENDPOINTS.OUR_STORY} className={styles.subLink}>
                      Our Story
                    </NavLink>
                    <NavLink to={ENDPOINTS.CONTACT_US} className={styles.subLink}>
                      Contact Us
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
                { loggedIn
                  ? (
                    <Dropdown item icon="user" className={classNames(styles.link, styles.boldLink)}>
                      <Dropdown.Menu>
                        <NavLink to={NEEDS_DASHBOARD_ENDPOINTS.DASHBOARD} className={styles.subLink}>
                          <Icon name="cog" />
                          Dashboard
                        </NavLink>
                        <NavLink to={ENDPOINTS.HELP} className={styles.subLink}>
                          <Icon name="question circle" />
                          Help
                        </NavLink>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <a onClick={handleLogOut} className={styles.subLink}>
                          <Icon name="sign-out" />
                          Log Out
                        </a>
                      </Dropdown.Menu>
                    </Dropdown>
                  )
                  : (
                    <NavLink to="/login" className={classNames(styles.link)}>Log in</NavLink>
                  )}
              </div>
            </div>
          </div>
          <div className={styles.header_filler} />
        </>
      )}
    </>
  );
};

const mapDispatchToProps = {
  logOut: logOutRoutine
};

const mapStateToProps = (state, ownProps) => ({
  orange: extractIsFooterOrange(state),
  loggedIn: extractIsUserLoggedIn(state),
  hidden: ownProps.blackListPaths.includes(extractLocationPathname(state)),
  stompClient: state.stompClient
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
