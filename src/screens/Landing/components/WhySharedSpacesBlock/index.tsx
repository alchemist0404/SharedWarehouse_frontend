import React from 'react';
import classNames from 'classnames';
import common from '@screens/Landing/containers/LandingPage/styles.module.scss';
import { Button } from 'semantic-ui-react';
import styles from './styles.module.scss';

const WhySharedSpacesBlock: React.FC = () => (
  <div className={classNames('content_wrapper', common.vertical_spaces, common.centered, styles.container)}>
    <div className={styles.thesis}>
      <h1>Why Shared Spaces?</h1>
      <p>
        Shared Spaces is a match-making platform where those looking to rent space can connect with
        those with excess space who are willing to rent. Everyone wins!
      </p>
    </div>
    <div className={styles.equal_columns}>
      <div>
        <h4>The haves</h4>
        <p>People or organizations with excess office warehouse or flex space to rent</p>
        <Button color="olive">List spaces</Button>
      </div>
      <div>
        <h4>The needs</h4>
        <p>People or organizations looking to rent office, warehouse, or flex space for cheap</p>
        <Button color="olive">Find spaces</Button>
      </div>
    </div>
  </div>
);

export default WhySharedSpacesBlock;
