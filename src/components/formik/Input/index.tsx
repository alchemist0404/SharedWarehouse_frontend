import React from 'react';
import CommonInput, { ICommonInputProps } from '@components/formik/common';
import { FormInput } from 'semantic-ui-react';
import { FormInputProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormInput';

export type IFormikInputProps = ICommonInputProps<HTMLInputElement, FormInputProps>;

const FormikInput: React.FC<IFormikInputProps> = props => (
  <CommonInput {...props} element={FormInput} />
);

export default FormikInput;
