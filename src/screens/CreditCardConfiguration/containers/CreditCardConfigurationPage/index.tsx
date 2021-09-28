import React from 'react';
import classNames from 'classnames';
import CreditCardConfiguration from '@screens/CreditCardConfiguration/containers/CreditCardConfiguration';
import styles from './styles.module.scss';

const CreditCardConfigurationStandalonePage: React.FC = () => (
  <div className={classNames('content_wrapper', styles.container)}>
    <CreditCardConfiguration />
  </div>
);

export default CreditCardConfigurationStandalonePage;
