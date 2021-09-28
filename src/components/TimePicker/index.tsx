import React from 'react';
import { FormInput } from 'semantic-ui-react';
import ReactTimePicker, { TimePickerProps } from 'react-time-picker';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';
import styles from './styles.module.scss';

export interface ITimePickerProps {
  semanticProps?: FormInputProps;
  timePickerProps?: TimePickerProps;
}

const TimePicker: React.FC<ITimePickerProps> = (
  { semanticProps, timePickerProps }
) => (
  <>
    <FormInput {...semanticProps}>
      <ReactTimePicker {...timePickerProps} className={styles.date_picker} disableClock format="hh:mm a" />
    </FormInput>
  </>
);

export default TimePicker;
