import React from 'react';
import styles from './styles.module.scss';

export interface IDashboardEntryProps {
  sideMenu: React.FC<IClassNameable>;
  routing: React.FC;
}

interface IClassNameable {
  className: string;
}

const DashboardEntry: React.FC<IDashboardEntryProps> = (
  { sideMenu: SideMenu, routing: Routing }
) => (
  <div className={`${styles.container} content_wrapper`}>
    <SideMenu className={styles.side_menu} />
    <div className={styles.content}>
      <Routing />
    </div>
  </div>
);

export default DashboardEntry;
