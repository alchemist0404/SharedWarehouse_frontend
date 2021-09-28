import React from 'react';
import styles from './styles.module.scss';
import errorImage from '@images/svg/error_smile.svg';
import successTick from '@images/svg/success_tick.svg';

export interface IStatusTemplateProps {
  isSuccess: boolean;
  statusText: string;
}

const StatusTemplate: React.FC<IStatusTemplateProps> = ({ isSuccess, statusText }) => (
  <div className={styles.container}>
    <img src={isSuccess ? successTick : errorImage} alt={isSuccess ? 'Success' : 'Error'} />
    <h3>{statusText}</h3>
  </div>
);

export default StatusTemplate;
