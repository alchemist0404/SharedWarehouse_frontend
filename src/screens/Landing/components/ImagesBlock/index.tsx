import React from 'react';
import classNames from 'classnames';
import common from '@screens/Landing/containers/LandingPage/styles.module.scss';
import officeImg from '@images/Office_Sapces.jpg';
import flexImg from '@images/Flex_Spaces.jpg';
import warehouseImg from '@images/Warehouse_Spaces.jpg';
import { Image } from 'semantic-ui-react';
import styles from './styles.module.scss';

const ImagesBlock: React.FC = () => (
  <div className={classNames('content_wrapper', common.vertical_spaces, common.centered, styles.container)}>
    <div className={styles.image_block}>
      <h2>Office</h2>
      <Image src={officeImg} size="large" />
    </div>
    <div className={styles.image_block}>
      <h2>Warehouse</h2>
      <Image src={warehouseImg} size="large" />
    </div>
    <div className={styles.image_block}>
      <h2>Flex</h2>
      <Image src={flexImg} size="large" />
    </div>
  </div>
);

export default ImagesBlock;
