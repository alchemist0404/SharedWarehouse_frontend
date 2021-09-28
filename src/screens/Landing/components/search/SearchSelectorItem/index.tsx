/* eslint-disable */
import React from 'react';
import SearchSelector, { ISearchSelectorProps } from '@screens/Landing/components/search/SearchSelector';

export type ISearchSelectorItemProps = ISearchSelectorProps;

const SearchSelectorItem: React.FC<ISearchSelectorItemProps> = props => (
  <SearchSelector
    {...props}
    trigger={(
      <div onClick={() => props.handleClick(props.index)}>
        {props.trigger}
      </div>
    )}
  />
);

export default SearchSelectorItem;
