import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button, Input } from 'semantic-ui-react';
import _ from 'lodash';

export interface ICounterInputProps {
  min?: number;
  max?: number;
  onChange?: (num: number) => void;
  className?: string;
  value?: number;
  disabled?: boolean;
  editable?: boolean;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
}

const CounterInput: React.FC<ICounterInputProps> = (
  { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER,
    className, onChange, value: outerValue,
    disabled, editable = true, size }
) => {
  const [currentValue, setCurrentValue] = useState(outerValue || 0);

  useEffect(() => {
    setCurrentValue(outerValue || 0);
  }, [outerValue]);

  const setNewValAndOnChange = value => {
    setCurrentValue(value);
    if (onChange) onChange(value);
  };

  const setNewVal = (value: number) => {
    if (value > max) {
      setNewValAndOnChange(max);
    } else if (value < min) {
      setNewValAndOnChange(min);
    } else {
      setNewValAndOnChange(value);
    }
  };

  const increase = () => {
    if (currentValue === max) return;
    setNewVal(currentValue + 1);
  };

  const decrease = () => {
    if (currentValue === min) return;
    setNewVal(currentValue - 1);
  };

  const [tempInputVal, setTempInputVal] = useState<string>();

  useEffect(() => {
    setTempInputVal(currentValue.toString());
  }, [currentValue]);

  const handleInputBlur = () => {
    const parsed = Number.parseInt(tempInputVal, 10);
    const newVal = _.isNaN(parsed) ? 0 : parsed;
    setNewVal(newVal);
    setTempInputVal(newVal.toString());
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <Button onClick={decrease} disabled={disabled} attached="left" icon="minus" size={size} type="button" />
      <Input
        max={max}
        value={tempInputVal || '0'}   
        disabled={disabled || !editable}
        onBlur={handleInputBlur}
        onChange={(ev, { value: val }) => setTempInputVal(val)}
        size={size}
      />
      <Button onClick={increase} disabled={disabled} attached="right" icon="plus" size={size} type="button" />
    </div>
  );
};

export default CounterInput;
