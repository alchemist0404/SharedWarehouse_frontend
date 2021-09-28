import React from 'react';
import { ISearchSelector } from '../model/SearchSelector';
import { BuildingType } from '@models/domain/BuildingType';
import { Checkbox } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './styles.module.scss';

export interface ISpaceTypeSelectorProps extends ISearchSelector {
  value: BuildingType[];
}

const SpaceTypeSelector: React.FC<ISpaceTypeSelectorProps> = ({ value, onChange }) => {
  const toggleBuildingType = (type: BuildingType) => {
    if (value.includes(type)) {
      onChange(value.filter(i => i !== type));
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <div className={styles.container}>
      {Object.keys(BuildingType).map(type => (
        <Checkbox
          key={type}
          label={_.startCase(_.toLower(type))}
          checked={value.includes(BuildingType[type])}
          onChange={() => toggleBuildingType(BuildingType[type])}
        />
      ))}
    </div>
  );
};

export default SpaceTypeSelector;
