import React, { useEffect, useState } from 'react';
import { FormInput, Popup } from 'semantic-ui-react';
import DateSelector, { IDateSelectorProps } from '@screens/Landing/components/search/selectors/DateSelector';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import { textFromDates } from '@components/DatePickerDropdown/utils';

export interface ISemanticDatePickerProps extends IDateSelectorProps {
  semanticProps: FormInputProps;
}

const SemanticDatePicker: React.FC<ISemanticDatePickerProps> = (
  { semanticProps, value, ...props }
) => {
  const [dateText, setDateText] = useState(textFromDates(value));
  const [popupOpen, setPopupOpen] = useState<boolean>();
  useEffect(() => {
    setDateText(textFromDates(value));
    setPopupOpen(false);
  }, [value]);

  return (
    <Popup
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
      onOpen={() => setPopupOpen(true)}
      position="bottom center"
      openOnTriggerClick
      openOnTriggerMouseEnter={false}
      closeOnTriggerMouseLeave={false}
      hideOnScroll
      content={<DateSelector {...props} value={value} />}
      trigger={<FormInput {...semanticProps} value={dateText} />}
    />
  );
};

export default SemanticDatePicker;
