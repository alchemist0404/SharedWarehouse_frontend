import React, { ChangeEvent } from 'react';
import { ISearchSelector } from '../model/SearchSelector';
import { Input, Select } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { IQueryDimensionsData } from '@screens/BrowseSpaces/model/QueryData';
import { IBindingCallback1 } from '@models/Callbacks';
import { filterStringNumeric } from '@helpers/string.helper';
import { LengthUnit, lengthUnitTypeKey } from '@models/domain/LengthUnit';
import { enumAsOptions } from '@helpers/enum.helper';

export interface IDimensionsSelectorProps extends ISearchSelector {
  value: IQueryDimensionsData;
  onChange: IBindingCallback1<IQueryDimensionsData>;
}

const DimensionsSelector: React.FC<IDimensionsSelectorProps> = ({ value, onChange }) => {
  const inputToDimension = (val: string) => {
    const strNumbers = filterStringNumeric(val);
    return strNumbers
      ? Number.parseInt(strNumbers, 10)
      : undefined;
  };

  const handleChangeDimension = (e: ChangeEvent<HTMLInputElement>, attribute: 'width' | 'length' | 'height') => {
    onChange({
      ...value,
      [attribute]: inputToDimension(e.target.value),
      unit: value?.unit || lengthUnitTypeKey(LengthUnit.FEET)
    });
  };

  return (
    <div className={styles.container}>
      <Input
        label={{ content: 'Length', className: styles.label }}
        onChange={e => handleChangeDimension(e, 'length')}
        value={value?.length || ''}
      />
      <Input
        label={{ content: 'Width', className: styles.label }}
        onChange={e => handleChangeDimension(e, 'width')}
        value={value?.width || ''}
      />
      <Input
        label={{ content: 'Height', className: styles.label }}
        onChange={e => handleChangeDimension(e, 'height')}
        value={value?.height || ''}
      />
      <Select
        options={enumAsOptions(LengthUnit)}
        placeholder="Units"
        onChange={(e: any, { value: v }) => onChange({
          ...value,
          unit: v as any
        })}
        value={value?.unit}
      />
    </div>
  );
};

export default DimensionsSelector;
