import React from 'react';
import common from '@screens/static/common.module.scss';
import PartnerWithUsContent from '@screens/static/PartnerWithUs/components/PageContent';

const PartnerWithUsPage: React.FC = () => (
  <div className={`${common.vertical_space} content_wrapper`}>
    <PartnerWithUsContent />
  </div>
);

export default PartnerWithUsPage;
