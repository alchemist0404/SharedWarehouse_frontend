import React from 'react';
import { FormikProps, withFormik } from 'formik';
import { IBindingCallback1 } from '@models/Callbacks';
import { Button, Divider, Form, FormGroup } from 'semantic-ui-react';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import _ from 'lodash';
import FormikInput from '@components/formik/Input';
import { IBankingData } from '@screens/HavesDashboard/FinancialBanking/model/BankingData';
import FormikSelect from '@components/formik/Select';
import { enumAsNullableOptions } from '@helpers/enum.helper';
import { CountryState } from '@models/domain/CountryState';

export interface IFinancialBankingFormProps {
  saveChanges: IBindingCallback1<IBankingData>;
  savingLoading: boolean;
  className?: string;
  initialValuesLoading: boolean;
  initialFormData?: IBankingData;
}

export interface IFormValues {
  bankName: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  beneficiaryName: string;
  address1: string | null;
  address2: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zip: string | null;
}

const validationSchema = Yup.object().shape({
  bankName: Yup.string()
    .trim()
    .required('Bank name is required'),
  beneficiaryName: Yup.string()
    .trim()
    .required('Beneficiary name is required'),
  bankAccountNumber: Yup.string()
    .required('Bank Account Number is required')
    .matches(/^\d{10}$/, 'Bank Account Number should contain 10 digits'),
  bankRoutingNumber: Yup.string()
    .required('Bank Routing Number is required')
    .matches(/^\d{9}$/, 'Bank Routing Number should contain 9 digits')
});

export function nilAreEqual(o1, o2): undefined | boolean {
  if (!o1 && !o2) {
    return true;
  }
  return undefined;
}

const FinancialBankingForm: React.FC<IFinancialBankingFormProps & FormikProps<IFormValues>> = (
  {
    handleSubmit, savingLoading, className, initialValuesLoading, values, initialValues
  }
) => (
  <Form name="bankingForm" onSubmit={handleSubmit} className={className} loading={initialValuesLoading}>
    <h2 className={styles.space_above}>Banking</h2>
    <Divider />
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'bankName',
          placeholder: 'Bank name'
        }}
        semanticProps={{
          label: 'Bank name',
          required: true
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'bankAccountNumber',
          placeholder: 'Bank Account Number (10 Digits)'
        }}
        semanticProps={{
          label: 'Bank Account Number',
          required: true
        }}
      />
    </FormGroup>
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'bankRoutingNumber',
          placeholder: 'Bank Routing Number (9 Digits)'
        }}
        semanticProps={{
          label: 'Bank Routing Number',
          required: true
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'beneficiaryName',
          placeholder: 'Beneficiary Name'
        }}
        semanticProps={{
          label: 'Beneficiary Name',
          required: true
        }}
      />
    </FormGroup>
    <h2 className={styles.space_above}>Address</h2>
    <Divider />
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'address1',
          placeholder: 'Street address'
        }}
        semanticProps={{
          label: 'Address1'
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'address2',
          placeholder: 'Suite/Apt. number'
        }}
        semanticProps={{
          label: 'Address2',
          className: styles.no_margin
        }}
      />
    </FormGroup>
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'city',
          placeholder: 'City'
        }}
        semanticProps={{
          label: 'City'
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'zip',
          placeholder: 'State zip'
        }}
        semanticProps={{
          label: 'ZIP'
        }}
      />
    </FormGroup>
    <FormikSelect
      propsOrFieldName={{
        name: 'state',
        placeholder: 'State'
      }}
      semanticProps={{
        options: enumAsNullableOptions(CountryState),
        required: false,
        label: 'State'
      }}
    />
    <Button
      className={styles.form_button}
      color="orange"
      content="Save"
      type="submit"
      loading={savingLoading}
      disabled={_.isEqualWith(initialValues, values, nilAreEqual)}
    />
  </Form>
);

export default withFormik<IFinancialBankingFormProps, IFormValues>({
  displayName: 'FinancialBankingForm',
  validationSchema,
  enableReinitialize: true,
  handleSubmit: ((values, { props }) => {
    props.saveChanges(values);
  }),
  mapPropsToValues: props => props.initialFormData
})(FinancialBankingForm);
