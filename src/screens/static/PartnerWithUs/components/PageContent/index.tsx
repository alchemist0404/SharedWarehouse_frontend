import React from 'react';
import styles from '@screens/static/PartnerWithUs/containers/PartnerWithUsPage/styles.module.scss';
import common from '@screens/static/common.module.scss';
import PropertyOwnersManagers from '@screens/static/PartnerWithUs/components/PropertyOwnersManagers';
import WarehouseLogisticsOfficeSpaceManagement
  from '@screens/static/PartnerWithUs/components/WarehouseLogisticsOfficeSpaceManagement';

export interface IHowItWorksContentProps {
  title?: string;
}

const PartnerWithUsContent: React.FC<IHowItWorksContentProps> = ({ title = 'Partner with Us' }) => (
  <div className={common.container}>
    <div className={styles.centered}>
      <h1>{title}</h1>
      <PropertyOwnersManagers />
      <WarehouseLogisticsOfficeSpaceManagement />
    </div>
  </div>

);

export default PartnerWithUsContent;
