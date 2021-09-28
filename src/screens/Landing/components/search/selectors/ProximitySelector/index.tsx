import React, { useCallback } from 'react';
import { ISearchSelector } from '../model/SearchSelector';
import { ILocationWithTitleData, IProximityData } from '@screens/BrowseSpaces/model/QueryData';
import LocationPicker from '@components/LocationPicker';
import { Select } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';

export interface IProximitySelectorProps extends ISearchSelector {
  value: IProximityData | undefined;
  onChange: IBindingCallback1<IProximityData>;
}

const rangeValues = [10, 50, 100, 500];

const ProximitySelector: React.FC<IProximitySelectorProps> = ({ value, onChange }) => {
  const handleChangeRange = useCallback((range: number) => {
    onChange({ ...value, range });
  }, [onChange, value]);

  const handleChangeLocation = useCallback((location: ILocationWithTitleData) => {
    onChange({
      ...value,
      location,
      range: value?.range || rangeValues[0]
    });
  }, [onChange, value]);

  return (
    <div>
      <Select
        value={value?.range}
        disabled={!value?.location}
        onChange={(_, { value: v }) => handleChangeRange(v as number)}
        options={rangeValues.map(v => ({ text: `${v} miles`, value: v, key: v }))}
        placeholder="Range"
        className={styles.select}
      />
      <LocationPicker
        location={value?.location}
        setLocation={handleChangeLocation}
      />
    </div>
  );
};

export default ProximitySelector;
