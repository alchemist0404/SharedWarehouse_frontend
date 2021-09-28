import React from 'react';
import styles from '../styles.module.scss';

const ImageWrapper: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (
  { children, className, ...props }
) => (
  <div className={`${styles.wrapper} ${className ?? ''}`} {...props}>
    {children}
  </div>
);

export default ImageWrapper;
