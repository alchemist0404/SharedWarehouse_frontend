import React, { useCallback, useState } from 'react';
import DateSelector, { IDateSelectorProps } from '@screens/Landing/components/search/selectors/DateSelector';
import styles from './styles.module.scss';
import { Icon } from 'semantic-ui-react';
import SearchSelectorItem from '@screens/Landing/components/search/SearchSelectorItem';
import { textFromDates } from '@components/DatePickerDropdown/utils';

export type IDatePickerDropdownProps = IDateSelectorProps

const DatePickerDropdown: React.FC<IDatePickerDropdownProps> = ({ value, onChange, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSelectorClick = index => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const dateText = useCallback(() => textFromDates(value), [value]);

  return (
    <SearchSelectorItem
      index={0}
      activeIndex={activeIndex}
      handleClick={handleSelectorClick}
      trigger={(
        <div className={`${styles.label_container} ${activeIndex === 0 && styles.active}`}>
          <span>
            {dateText()}
            <Icon name="dropdown" />
          </span>
        </div>
      )}
      content={<DateSelector {...props} value={value} onChange={onChange} />}
    />
  );
};

export default DatePickerDropdown;
