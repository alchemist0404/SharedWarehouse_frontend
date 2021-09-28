import React from 'react';
import CommonInput, { ICommonInputProps } from '@components/formik/common';
import { Dropdown } from 'semantic-ui-react';
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { useField } from 'formik';

export type IFormikTagSelectorProps = ICommonInputProps<HTMLElement, DropdownProps>

const FormikTagSelector: React.FC<IFormikTagSelectorProps> = (
  { propsOrFieldName, semanticProps, ...props }
) => {
  const [field, , helpers] = useField(propsOrFieldName);

  return (
    <CommonInput
      {...field}
      {...props}
      semanticProps={{
        ...semanticProps,
        onChange: (ev, { value }) => helpers.setValue(value as any),
        onBlur: () => helpers.setTouched(true),
        value: field.value as any || [],
        search: true,
        multiple: true,
        selection: true
      }}
      propsOrFieldName={propsOrFieldName}
      element={Dropdown}
    />
  );
};

export default FormikTagSelector;
