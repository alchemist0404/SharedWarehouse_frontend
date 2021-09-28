import React, { useCallback, useState } from 'react';
import { Button, Menu, MenuItem } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { IProximityData, IQueryData } from '@screens/BrowseSpaces/model/QueryData';
import { PageSize } from '@screens/BrowseSpaces/model/PageSize';
import SpaceTypeSelector from '@screens/Landing/components/search/selectors/SpaceTypeSelector';
import ProximitySelector from '@screens/Landing/components/search/selectors/ProximitySelector';
import DateSelector from '@screens/Landing/components/search/selectors/DateSelector';
import SpaceAmountSelector from '@screens/Landing/components/search/selectors/SpaceAmountSelector';
import moment from 'moment';
import { isEmpty, isNil, lowerCase, startCase } from 'lodash';
import { connect } from 'react-redux';
import { setSearchFiltersRoutine } from '@screens/Landing/routines';
import { IBindingCallback1 } from '@models/Callbacks';
import SearchSelectorMenuItem from '@screens/Landing/components/search/SearchSelectorMenuItem';
import DimensionsSelector from '@screens/Landing/components/search/selectors/DimensionsSelector';

export interface ISearchBarProps {
  className?: string;
  setFilters: IBindingCallback1<IQueryData>;
}

const SearchBar: React.FC<ISearchBarProps> = ({ className, setFilters }) => {
  const [activeSelector, setActiveSelector] = useState(-1);
  const [searchSelector, setSearchSelector] = useState<IQueryData>({ page: 1, size: PageSize.TWENTY_FIVE });
  const { dimensions } = searchSelector;
  const handleSearchClick = () => {
    setFilters(searchSelector);
  };

  const handleSelectorClick = index => {
    setActiveSelector(activeSelector === index ? -1 : index);
  };

  const dateText = useCallback(() => {
    if (isNil(searchSelector.dates?.startingDate)) {
      return 'Pick a date';
    }
    if (isNil(searchSelector.dates.endingDate)) {
      return moment(searchSelector.dates.startingDate).format('L');
    }
    return `${moment(searchSelector.dates.startingDate).format('L')} - ${
      moment(searchSelector.dates.endingDate).format('L')}`;
  }, [searchSelector.dates]);

  const spaceTypeText = useCallback(() => {
    if (isEmpty(searchSelector.includedBuildingTypes)) {
      return 'Office/Warehouse/Flex';
    }
    return searchSelector.includedBuildingTypes.map(type => startCase(lowerCase(type))).join(', ');
  }, [searchSelector.includedBuildingTypes]);

  const handleChangeProximity = (value: IProximityData) => {
    setSearchSelector(prev => ({ ...prev, proximity: value }));
  };

  return (
    <Menu className={`${styles.menu} ${className}`} compact>
      <SearchSelectorMenuItem
        index={1}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div className={`${styles.vertical} ${styles.space_type_selector}`}>
            <strong>Space type</strong>
            <span>{spaceTypeText()}</span>
          </div>
        )}
        content={(
          <SpaceTypeSelector
            onChange={value => setSearchSelector(prevState => ({ ...prevState, includedBuildingTypes: value }))}
            value={searchSelector.includedBuildingTypes || []}
          />
        )}
      />
      <SearchSelectorMenuItem
        index={2}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <>
            <div className={`${styles.vertical} ${styles.right_space}`}>
              <strong>Proximity to</strong>
              <span>
                {searchSelector.proximity
                  ? searchSelector.proximity.location.title
                  : 'Zip code'}
              </span>
            </div>
            <div className={styles.vertical}>
              <strong>Range</strong>
              <span>{searchSelector.proximity ? `${searchSelector.proximity.range} miles` : 'Miles'}</span>
            </div>
          </>
        )}
        content={(
          <ProximitySelector
            value={searchSelector.proximity}
            onChange={handleChangeProximity}
          />
        )}
        closeOnDocumentClick={false}
      />
      <SearchSelectorMenuItem
        index={3}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div className={`${styles.vertical} ${styles.date_picker_selector}`}>
            <strong>Available Date</strong>
            <span>{dateText()}</span>
          </div>
        )}
        content={(
          <DateSelector
            onChange={value => setSearchSelector(prev => ({ ...prev, dates: value }))}
            value={searchSelector.dates}
          />
        )}
      />
      <SearchSelectorMenuItem
        index={4}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div className={styles.vertical}>
            <strong>Dimensions</strong>
            <span>
              {dimensions?.length && dimensions?.width && dimensions?.height
                ? `${dimensions.length} x ${dimensions.width} x ${dimensions.height}
                   (${dimensions?.unit.toLocaleLowerCase()})`
                : 'Length / Width / Height'}
            </span>
          </div>
        )}
        content={(
          <DimensionsSelector
            onChange={value => setSearchSelector(prev => ({ ...prev, dimensions: value }))}
            value={searchSelector.dimensions}
          />
        )}
      />
      <SearchSelectorMenuItem
        index={5}
        activeIndex={activeSelector}
        handleClick={handleSelectorClick}
        trigger={(
          <div className={styles.vertical}>
            <strong>How Much Space?</strong>
            <span>SF or # of Pallets</span>
          </div>
        )}
        content={(
          <SpaceAmountSelector
            onChange={value => setSearchSelector(prev => ({ ...prev, amount: value }))}
            value={searchSelector.amount}
          />
        )}
      />
      <MenuItem fitted="horizontally">
        <Button
          icon="search"
          circular
          color="blue"
          onClick={handleSearchClick}
        />
      </MenuItem>
    </Menu>
  );
};

const mapDispatchToProps = {
  setFilters: setSearchFiltersRoutine
};

export default connect(null, mapDispatchToProps)(SearchBar);
