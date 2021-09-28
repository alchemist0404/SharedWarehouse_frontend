import React from 'react';
import CommonInput, { ICommonInputProps } from '@components/formik/common';
import { FormTextArea } from 'semantic-ui-react';
import { FormTextAreaProps } from 'semantic-ui-react/dist/commonjs/collections/Form/FormTextArea';

export type IFormikTextAreaProps = ICommonInputProps<HTMLTextAreaElement, FormTextAreaProps>;

const FormikTextArea: React.FC<IFormikTextAreaProps> = props => (
  <CommonInput {...props} element={FormTextArea} />
);

export default FormikTextArea;
