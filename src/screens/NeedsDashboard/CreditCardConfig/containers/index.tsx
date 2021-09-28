import React from 'react';
import CreditCardConfiguration from '@screens/CreditCardConfiguration/containers/CreditCardConfiguration';
import common from '@screens/NeedsDashboard/styles/common.module.scss';

const CreditCardConfigPage: React.FC = () => (
  <div className={common.container}>
    <h1>Credit cards</h1>
    <h2>Your credit cards</h2>
    <CreditCardConfiguration />
  </div>
);

export default CreditCardConfigPage;
