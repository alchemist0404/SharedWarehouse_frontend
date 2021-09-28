import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';

export interface ISideMenuProps {
  tabs: ITabProps[];
  className?: string;
}

export interface ITabProps {
  title: string;
  path: string;
  header?: boolean;
}

const withHistory = history => (path: string) => {
  const oldLocation = history.location.pathname === path;
  return oldLocation ? undefined : () => history.push(path);
};

const SideMenu: React.FC<ISideMenuProps> = (
  { tabs, className }
) => {
  const location = useLocation();
  const history = useHistory();

  const goTo = useCallback(path => withHistory(history)(path), [history]);

  return (
    <Menu vertical className={`${styles.menu} ${className || ''}`}>
      {tabs.map(tab => (
        <MenuItem
          key={tab.title}
          header={tab.header}
          active={location.pathname === tab.path}
          onClick={goTo(tab.path)}
          content={tab.title}
        />
      ))}
      <MenuItem />
    </Menu>
  );
};

export default SideMenu;
