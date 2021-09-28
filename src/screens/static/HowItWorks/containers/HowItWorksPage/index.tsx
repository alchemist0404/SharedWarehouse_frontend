import React from 'react';
import common from '@screens/static/common.module.scss';
import HowItWorksContent from '@screens/static/HowItWorks/components/PageContent';

const HowItWorksPage: React.FC = () => (
  <div className={`${common.vertical_space} content_wrapper`}>
    <HowItWorksContent />
  </div>
);

export default HowItWorksPage;
