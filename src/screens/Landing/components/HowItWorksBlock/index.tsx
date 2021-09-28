import React from 'react';
import HowItWorksContent from '@screens/static/HowItWorks/components/PageContent';
import styles from './styles.module.scss';
import common from '@screens/Landing/containers/LandingPage/styles.module.scss';

const HowItWorksBlock: React.FC = () => (
  <div className={styles.background}>
    <div className={`content_wrapper ${common.vertical_spaces}`}>
      <HowItWorksContent title="How it works" />
    </div>
  </div>
);

export default HowItWorksBlock;
