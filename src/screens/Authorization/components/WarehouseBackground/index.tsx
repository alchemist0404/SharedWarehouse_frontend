import React from 'react';
import warehouse from '@images/Warehouse_Spaces.jpg';
import styles from './styles.module.scss';

const image = {
  backgroundImage: `url(${warehouse})`
};

const WarehouseBackground: React.FC = () => (
  <div data-relative-input="true" id="scene" style={{ position: 'fixed' }}>
    <div className={styles.image} style={image as any} data-depth="0.2" />
    <div className={styles.cover} />
  </div>
);

export default WarehouseBackground;
