import React from 'react';
import { Button, Dropdown, DropdownItemProps, Icon, Menu, MenuItem } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { IBindingCallback1 } from '@models/Callbacks';
import { PageLayout } from '@screens/BrowseSpaces/model/PageLayout';
import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import _ from 'lodash';

export interface ILayoutSelectorProps {
  resultsNumber: number;
  setLayout: IBindingCallback1<PageLayout>;
  setPageSize: IBindingCallback1<PageSize>;
  activeLayout: PageLayout;
  pageSize: PageSize | string;
}

const pageSizeOptions: DropdownItemProps[] = Object.keys(PageSize).filter(k => _.isNumber(PageSize[k]))
  .map(sizeName => ({
    key: sizeName,
    value: sizeName,
    text: `${PageSize[sizeName]} results per page`
  }));

const LayoutSelector: React.FC<ILayoutSelectorProps> = (
  { resultsNumber, setLayout, setPageSize, activeLayout, pageSize }
) => (
  <Menu className={styles.menu} compact text>
    <Button
      icon
      className={styles.button}
      active={activeLayout === PageLayout.LIST}
      onClick={() => setLayout(PageLayout.LIST)}
    >
      <Icon name="list layout" />
    </Button>
    <Button
      icon
      className={styles.button}
      active={activeLayout === PageLayout.GRID}
      onClick={() => setLayout(PageLayout.GRID)}
    >
      <Icon name="grid layout" />
    </Button>
    <MenuItem>
      <span>{`${resultsNumber} results`}</span>
    </MenuItem>
    <Dropdown
      item
      placeholder="Results per page"
      onChange={(ev, { value }) => setPageSize(PageSize[value as string])}
      value={PageSize[pageSize]}
      options={pageSizeOptions}
    />
  </Menu>
);

export default LayoutSelector;
