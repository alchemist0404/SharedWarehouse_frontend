import React from 'react';
import s from './styles.module.scss';

export interface IHostedByLabelProps {
  companyName: string;
}

const HostedByLabel: React.FC<IHostedByLabelProps> = ({ companyName }) => (
  <>
    <h4 className={s.company_label}>HOSTED BY</h4>
    <h3 className={s.company_name}>{companyName}</h3>
  </>
);

export default HostedByLabel;
