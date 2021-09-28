import React from 'react';
import SearchSelector, { ISearchSelectorProps } from '@screens/Landing/components/search/SearchSelector';
import { MenuItem } from 'semantic-ui-react';

export type ISearchSelectorMenuItemProps = ISearchSelectorProps;

const SearchSelectorMenuItem: React.FC<ISearchSelectorMenuItemProps> = props => (
  <SearchSelector
    {...props}
    trigger={(
      // eslint-disable-next-line react/destructuring-assignment
      <MenuItem link onClick={() => props.handleClick(props.index)} active={props.activeIndex === props.index}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.trigger}
      </MenuItem>
    )}
  />
);

export default SearchSelectorMenuItem;
