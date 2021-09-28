import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, Label, Menu, MenuItem, Popup } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import DateSelector from '@screens/Landing/components/search/selectors/DateSelector';
import { IDatesData, IProximityData, IQueryData, IQueryDimensionsData } from '@screens/BrowseSpaces/model/QueryData';
import { isEmpty, isNil } from 'lodash';
import SpaceTypeSelector from '@screens/Landing/components/search/selectors/SpaceTypeSelector';
import SearchSelectorMenuItem from '@screens/Landing/components/search/SearchSelectorMenuItem';
import { BuildingType } from '@models/domain/BuildingType';
import DimensionsSelector from '@screens/Landing/components/search/selectors/DimensionsSelector';
import ProximitySelector from '@screens/Landing/components/search/selectors/ProximitySelector';

export interface ISearchBarProps {
  performSearch: IBindingAction;
  searchLoading: boolean;
  searchQuery: IQueryData;
  clearFilters: IBindingAction;
  updateFilters: IBindingCallback1<IQueryData>;
}

const SearchBar: React.FC<ISearchBarProps> = (
  { performSearch, searchLoading, searchQuery, clearFilters, updateFilters }
) => {
  const [activeSelector, setActiveSelector] = useState(-1);
  const [tempQuery, setTempQuery] = useState({
    ...searchQuery,
    dates: { startingDate: searchQuery.dates?.startingDate ?? new Date(), endingDate: searchQuery.dates?.endingDate }
  } as IQueryData);
  const [isPendingFilterChanges, setIsPendingFilterChanges] = useState(false);
  const [isFilterClear, setIsFilterClear] = useState(false);

  useEffect(() => {
    setIsPendingFilterChanges(!isFilterClear);
  }, [isFilterClear, tempQuery.dates, tempQuery.includedBuildingTypes, tempQuery.dimensions, tempQuery.proximity]);

  const handleSelectorClick = index => {
    setActiveSelector(activeSelector === index ? -1 : index);
  };

  const handleSearchClick = () => {
    setIsPendingFilterChanges(false);
    updateFilters(tempQuery);
    performSearch();
  };

  const handleChangeProximity = (value: IProximityData) => {
    setTempQuery(prev => ({ ...prev, proximity: value }));
    setIsFilterClear(false);
  };

  const handleChangeSpaceType = (value: BuildingType[]) => {
    setTempQuery(prev => ({ ...prev, includedBuildingTypes: value }));
    setIsFilterClear(false);
  };

  const handleChangeDateSelection = (value: IDatesData) => {
    setTempQuery(prev => ({ ...prev, dates: value }));
    setIsFilterClear(false);
  };

  const handleChangeDimensionsSelection = (value: IQueryDimensionsData) => {
    setTempQuery(prev => ({ ...prev, dimensions: value }));
    setIsFilterClear(false);
  };

  const handleClearFiltersClick = () => {
    setTempQuery(prev => ({ pendingText: prev.pendingText }));
    setIsFilterClear(true);
    clearFilters();
    performSearch();
  };

  const handleClearSearchClick = () => {
    const pendingText = '';
    setTempQuery(prev => ({ ...prev, pendingText }));
    updateFilters({ ...tempQuery, pendingText });
    setIsFilterClear(true);
    performSearch();
  };

  const handleEnterKeyPress = e => {
    if (e.key === 'Enter') handleSearchClick();
  };

  return (
    <Menu text className={styles.menu}>
      <MenuItem header>Filter by</MenuItem>
      <SearchSelectorMenuItem
        index={1}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div>
            Proximity
            <Icon name="dropdown" />
            {isEmpty(tempQuery.proximity) || <Label color="green" floating empty circular />}
          </div>
        )}
        content={(
          <ProximitySelector
            value={tempQuery.proximity}
            onChange={handleChangeProximity}
          />
        )}
        closeOnDocumentClick={false}
      />
      <SearchSelectorMenuItem
        index={2}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div>
            Space Type
            <Icon name="dropdown" />
            {isEmpty(tempQuery.includedBuildingTypes) || <Label color="green" floating empty circular />}
          </div>
        )}
        content={(
          <SpaceTypeSelector
            onChange={value => handleChangeSpaceType(value)}
            value={tempQuery.includedBuildingTypes || []}
          />
        )}
      />
      <SearchSelectorMenuItem
        index={3}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div>
            Date selection
            <Icon name="dropdown" />
            {isNil(tempQuery.dates) || <Label color="green" floating empty circular />}
          </div>
        )}
        content={(
          <DateSelector
            onChange={value => handleChangeDateSelection(value)}
            value={tempQuery.dates}
          />
        )}
      />
      <SearchSelectorMenuItem
        index={4}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div>
            Dimensions
            <Icon name="dropdown" />
            {isEmpty(tempQuery.dimensions) || <Label color="green" floating empty circular />}
          </div>
        )}
        content={(
          <DimensionsSelector
            value={tempQuery.dimensions}
            onChange={handleChangeDimensionsSelection}
          />
        )}
      />
      <MenuItem>
        <Popup
          content="There are pending changes and you can apply them"
          openOnTriggerMouseEnter={isPendingFilterChanges}
          on="hover"
          closeOnTriggerClick
          trigger={(
            <Button
              className={isPendingFilterChanges ? styles.search_button_orange : styles.search_button}
              icon="filter"
              onClick={handleSearchClick}
              loading={searchLoading}
            />
          )}
        />
      </MenuItem>
      <MenuItem
        className={styles.clear_button}
        name="Clear filters"
        onClick={handleClearFiltersClick}
      />
      <MenuItem position="right">
        <Popup
          content="There are pending changes and you can apply them"
          openOnTriggerMouseEnter={Boolean(tempQuery.pendingText)}
          on="hover"
          closeOnTriggerClick
          trigger={(
            <Button
              className={tempQuery.pendingText ? styles.search_button_orange : styles.search_button}
              icon="search"
              onClick={handleSearchClick}
              loading={searchLoading}
            />
          )}
        />
        <Input
          className={styles.search}
          placeholder="Search..."
          transparent
          value={tempQuery.pendingText || ''}
          onKeyPress={handleEnterKeyPress}
          onChange={(event, { value }) => setTempQuery(prev => ({ ...prev, pendingText: value }))}
          icon={<Icon name="delete" link onClick={handleClearSearchClick} />}
        />
      </MenuItem>
    </Menu>
  );
};

export default SearchBar;
