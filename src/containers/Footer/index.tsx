import React from 'react';
import { Link } from 'react-router-dom';
import s from './styles.module.scss';
import classNames from 'classnames';
import FacebookIcon from '@components/icons/facebook';
import LinkedinIcon from '@components/icons/linkedin';
import { connect } from 'react-redux';
import { extractLocationPathname } from '@helpers/url.helper';
import { extractIsFooterOrange } from '@containers/AppRoute/reducer';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const {
  ROOT, OUR_STORY, JOIN_OUR_TEAM, PRIVACY_POLICY, TERMS_AND_CONDITIONS
} = ENDPOINTS;

export interface IFooterProps {
  orange: boolean;
  hidden: boolean;
  blackListPaths: string[];
}

const Footer: React.FC<IFooterProps> = ({ orange = false, hidden }) => (
  <>
    {hidden ? null : (
      <div className={orange ? s.footer__orange : s.footer__dark}>
        <div className={classNames('content_wrapper', s.vertical_space, s.columns)}>
          <div className={classNames(s.column, s.logo_title)}>
            <Link to={ROOT}>Shared Spaces</Link>
          </div>
          <div className={s.column}>
            <span className={s.contact_title}>Contact</span>
            <p>
              801 N. East Street Ste. 9A
              <br />
              Frederick, Maryland 21701
            </p>
            <a href="mailto:hello@sharedspacesgroup.com">hello@sharedspacesgroup.com</a>
            <a href="tel:2403572333">240-357-2333</a>
          </div>
          <div className={classNames(s.column, s.links_list)}>
            <Link to={OUR_STORY}>About us</Link>
            <Link to={JOIN_OUR_TEAM}>Careers</Link>
            <Link to={PRIVACY_POLICY}>Privacy Policy</Link>
            <Link to={TERMS_AND_CONDITIONS}>Terms & Conditions</Link>
            <div className={classNames(s.row, s.socials)}>
              <a
                href="https://www.linkedin.com/company/72685708"
                rel="noopener noreferrer"
                target="_blank"
                className={s.linkedin}
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://facebook.com"
                rel="noopener noreferrer"
                target="_blank"
                className={s.facebook}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

const mapStateToProps = (state, ownProps) => ({
  orange: extractIsFooterOrange(state),
  hidden: ownProps.blackListPaths.includes(extractLocationPathname(state))
});

export default connect(mapStateToProps, null)(Footer);
