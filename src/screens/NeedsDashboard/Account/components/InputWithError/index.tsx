import React from 'react';
import { FormInput } from 'semantic-ui-react';
import ErrorPopup from '@components/FormErrorPopup';
import { InputOnChangeData } from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import { FormikErrors, FormikTouched, FormikValues } from 'formik';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';

export interface IInputWithErrorProps extends FormInputProps {
  name: string;
  placeholder?: string;
  formik: IFormikBag;
}

export interface IFormikBag {
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  values: FormikValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  handleBlur: Function;
}

const InputWithError: React.FC<IInputWithErrorProps> = (
  { name, placeholder, formik: { touched, errors, values, handleChange, handleBlur }, ...props }
) => (
  <ErrorPopup
    open={!!(touched[name] && errors[name])}
    label={errors[name] as string}
    component={(
      <FormInput
        {...props}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[name] || ''}
        error={errors[name] && touched[name]}
        onBlur={handleBlur}
      />
      )}
  />
);

export default InputWithError;
