import React from 'react';
import StatusTemplate from '@components/StatusTemplate';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import { ENDPOINTS } from '@containers/Routing/endpoints';

const OrderResult: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <StatusTemplate isSuccess statusText="Your order has been placed" />
      <div className={styles.button_container}>
        <Button color="olive" onClick={() => history.push(ENDPOINTS.ROOT)} content="Go home" />
      </div>
    </>
  );
};

export default OrderResult;
