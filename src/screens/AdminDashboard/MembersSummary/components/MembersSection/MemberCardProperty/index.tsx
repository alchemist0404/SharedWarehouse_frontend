import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IMemberCardPropertyProps {
  title: string;
  value?: string;
  className?: string;
}

const MemberCardProperty: React.FC<IMemberCardPropertyProps> = ({ title, value, className }) => (
  <div className={classNames(styles.wrapper, className)}>
    <div className={styles.title}>
      {title}
      :
    </div>
    <div className={styles.value}>{value || '-'}</div>
  </div>
);

export default MemberCardProperty;
