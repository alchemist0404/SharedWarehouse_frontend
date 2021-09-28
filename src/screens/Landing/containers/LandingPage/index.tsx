import React from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';
import FrontBlock from '@screens/Landing/components/FrontBlock';
import WhySharedSpacesBlock from '@screens/Landing/components/WhySharedSpacesBlock';
import HowItWorksBlock from '@screens/Landing/components/HowItWorksBlock';
import ImagesBlock from '@screens/Landing/components/ImagesBlock';
import ScrollToTopOnMount from '@components/ScrollToTop';

const LandingPage: React.FC = () => (
  <div className={classNames(s.container, s.top_offset)}>
    <ScrollToTopOnMount />
    <FrontBlock />
    <WhySharedSpacesBlock />
    <HowItWorksBlock />
    <ImagesBlock />
  </div>
);

export default LandingPage;
