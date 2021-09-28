/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import CommonInput, { ICommonInputProps } from '@components/formik/common';
import { Select, SelectProps } from 'semantic-ui-react';
import { useField } from 'formik';
import classNames from 'classnames';
import common from '../common/styles.module.scss';
import styles from './styles.module.scss';

export type IFormikSelectProps = ICommonInputProps<HTMLElement, SelectProps>;

const FormikSelect: React.FC<IFormikSelectProps> = ({ semanticProps, propsOrFieldName, ...props }) => {
  const [,, helpers] = useField(propsOrFieldName);

  return (
    <div>
      {semanticProps.label && (
        <div className={classNames(styles.select_label, 'field', semanticProps.required && 'required')}>
          <label>{semanticProps.label}</label>
        </div>
      )}
      <CommonInput
        {...props}
        propsOrFieldName={propsOrFieldName}
        element={Select}
        semanticProps={{
          ...semanticProps,
          onChange: (ev, { value }) => helpers.setValue(value as any),
          onBlur: () => helpers.setTouched(true),
          fluid: true,
          className: `${common.field} ${semanticProps.className}`
        }}
      />
    </div>
  );
};

export default FormikSelect;
