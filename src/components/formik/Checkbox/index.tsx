import React from 'react';
import { ICommonInputProps } from '@components/formik/common';
import { Checkbox } from 'semantic-ui-react';
import { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import { useField } from 'formik';
import ErrorPopup from '@components/FormErrorPopup';

export type IFormikCheckboxProps = ICommonInputProps<HTMLInputElement, CheckboxProps>;

const FormikCheckbox: React.FC<IFormikCheckboxProps> = (
  { propsOrFieldName, semanticProps, popupPosition }
) => {
  const [field, meta, helpers] = useField(propsOrFieldName);
  const isError = !!(meta.touched && meta.error);

  return (
    <ErrorPopup
      open={isError}
      label={meta.error}
      position={popupPosition}
      component={(
        <Checkbox
          name={field.name}
          checked={field.checked}
          {...semanticProps}
          onChange={(ev, { checked }) => helpers.setValue(checked as any)}
        />
      )}
    />
  );
};

export default FormikCheckbox;
