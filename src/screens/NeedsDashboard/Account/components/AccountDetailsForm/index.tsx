import React from 'react';
import { FormikProps, withFormik } from 'formik';
import { IBindingCallback1 } from '@models/Callbacks';
import { Regex } from '@models/domain/Regex';
import { Button, Divider, Form, FormGroup, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import * as Yup from 'yup';
import { emailValidation } from '@screens/Authorization/components/validation';
import styles from './styles.module.scss';
import { IProfileData } from '@screens/NeedsDashboard/Account/model/ProfileData';
import _ from 'lodash';
import parsePhoneNumber from 'libphonenumber-js';
import FormikInput from '@components/formik/Input';
import FormikSelect from '@components/formik/Select';
import { enumAsNullableOptions } from '@helpers/enum.helper';
import { CountryState } from '@models/domain/CountryState';

export interface IAccountDetailsFormProps {
  saveChanges: IBindingCallback1<IProfileData>;
  savingLoading: boolean;
  className?: string;
  initialValuesLoading: boolean;
  initialFormData: IFormValues;
  autoFocusInputName?: string;
}

export interface IFormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  country: string;
  zip: string;
}

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string()
    .matches(new RegExp(Regex.PASSWORD_REGEX),
      'Password has to be longer than 8 characters'
      + ' and has be no more than 40 characters,'
      + ' must start with a letter,'
      + ' contain one uppercase letter and a special character.'),
  repeatPassword: Yup.string()
    .when('password', {
      is: values => values && values.length,
      then: Yup.string()
        .required('Repeat password is required')
        .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
    })
});

const formToProfileData = (value: IFormValues): IProfileData => ({
  ...value,
  location: {
    ...value
  }
});

export function nilAreEqual(o1, o2): undefined | boolean {
  if (!o1 && !o2) {
    return true;
  }
  return undefined;
}

const COUNTRY = 'US';

const validatePhone = value => {
  if (!value) return {};
  let valid = false;
  const phoneNumber = parsePhoneNumber(value, COUNTRY);
  if (phoneNumber) {
    valid = phoneNumber.isValid();
  }
  return valid ? {} : { phone: 'Invalid number' };
};

const AccountDetailsForm: React.FC<IAccountDetailsFormProps & FormikProps<IFormValues>> = (
  {
    handleSubmit,
    savingLoading,
    className,
    initialValuesLoading,
    values,
    initialValues,
    autoFocusInputName
  }
) => (
  <Form name="profileForm" onSubmit={handleSubmit} className={className} loading={initialValuesLoading}>
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'firstName',
          placeholder: 'Jonh'
        }}
        semanticProps={{
          label: 'First name'
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'lastName',
          placeholder: 'Doe'
        }}
        semanticProps={{
          label: 'Last name'
        }}
      />
    </FormGroup>
    <FormGroup widths="equal">
      <FormikInput
        propsOrFieldName={{
          name: 'email',
          placeholder: 'example@mail.com'
        }}
        semanticProps={{
          label: 'Email'
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'phone',
          placeholder: '+1(213) 373-4253'
        }}
        semanticProps={{
          label: 'Phone number',
          className: styles.phone
        }}
      />
    </FormGroup>
    <FormikInput
      propsOrFieldName={{
        name: 'companyName',
        placeholder: 'Name of your company',
        autoFocus: autoFocusInputName === 'companyName'
      }}
      semanticProps={{
        label: 'Company name'
      }}
    />
    <h2 className={styles.space_above}>Update password</h2>
    <Divider />
    <Grid>
      <GridRow columns={2}>
        <GridColumn>
          <FormikInput
            propsOrFieldName={{
              type: 'password',
              name: 'password',
              placeholder: 'Password'
            }}
            semanticProps={{
              label: 'Update password'
            }}
          />
        </GridColumn>
        <GridColumn>
          <FormikInput
            propsOrFieldName={{
              type: 'password',
              name: 'repeatPassword',
              placeholder: 'Repeat password'
            }}
            semanticProps={{
              label: 'Repeat password'
            }}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={2} className={styles.inputGuide}>
        <GridColumn>
          <div>
            <p>
              * Password size must be between 8 and 40 characters,
              must start with a letter, contain one uppercase letter and a special character.
            </p>
          </div>
        </GridColumn>
        <GridColumn>
          <GridColumn>
            <div>
              <p>
                * Both passwords need to be the same.
              </p>
            </div>
          </GridColumn>
        </GridColumn>
      </GridRow>
    </Grid>
    <h2 className={styles.space_above}>Address</h2>
    <Divider />
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
    <FormikInput
      propsOrFieldName={{
        name: 'city',
        placeholder: 'City'
      }}
      semanticProps={{
        label: 'City'
      }}
    />
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
    <FormikInput
      propsOrFieldName={{
        name: 'zip',
        placeholder: 'State zip'
      }}
      semanticProps={{
        label: 'ZIP'
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

export default withFormik<IAccountDetailsFormProps, IFormValues>({
  displayName: 'AccountDetailsForm',
  validationSchema,
  enableReinitialize: true,
  handleSubmit: ((values, { props, resetForm }) => {
    props.saveChanges(formToProfileData(values));
    resetForm();
  }),
  mapPropsToValues: props => ({ ...props.initialFormData, password: '', repeatPassword: '' }),
  validate: values => validatePhone(values.phone)
})(AccountDetailsForm);
