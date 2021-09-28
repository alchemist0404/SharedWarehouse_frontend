import React, { useRef } from 'react';
import { Button, Form, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import FormikInput from '@components/formik/Input';
import { IBindingCallback1 } from '@models/Callbacks';
import { IJoinOurTeamData } from '@screens/static/JoinOurTeam/model/IJoinOurTeamData';
import { FormikProps, withFormik } from 'formik';
import styles from './styles.module.scss';
import FormikSelect from '@components/formik/Select';
import { enumAsNullableOptions } from '@helpers/enum.helper';
import { CountryState } from '@models/domain/CountryState';
import FormikTextArea from '@components/formik/TextArea';
import _ from 'lodash';
import * as Yup from 'yup';
import { emailValidation } from '@screens/Authorization/components/validation';

export interface IJoinOurTeamFormProps {
  saveChanges?: IBindingCallback1<IJoinOurTeamData>;
  initialFormData?: IJoinOurTeamData;
}
export interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('First name is required'),
  lastName: Yup.string()
    .trim()
    .required('Last name is required'),
  email: emailValidation,
  phone: Yup.string()
    .trim()
    .required('Phone number is required'),
  message: Yup.string()
    .trim()
    .required('Message is required')
    .max(800)
});

export function nilAreEqual(o1, o2): undefined | boolean {
  if (!o1 && !o2) {
    return true;
  }
  return undefined;
}

const JoinOurTeamForm: React.FC<IJoinOurTeamFormProps & FormikProps<IFormValues>> = (
  { handleSubmit, values, initialValues }
) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleFilesSelection = (ev: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(ev.target.files);
  };

  return (
    <Form name="joinOurTeamForm" onSubmit={handleSubmit}>
      <Grid>
        <GridRow columns={2}>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'firstName',
                placeholder: 'First Name'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'lastName',
                placeholder: 'Last Name'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={2}>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'email',
                placeholder: 'Email Address'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'phone',
                placeholder: 'Phone No.'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={2}>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'address1',
                placeholder: 'Address1'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
          <GridColumn>
            <FormikInput
              propsOrFieldName={{
                name: 'address2',
                placeholder: 'Address2'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={3}>
          <GridColumn width={4}>
            <FormikInput
              propsOrFieldName={{
                name: 'city',
                placeholder: 'City'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
          <GridColumn width={4}>
            <FormikSelect
              propsOrFieldName={{
                name: 'state',
                placeholder: 'State'
              }}
              semanticProps={{
                options: enumAsNullableOptions(CountryState),
                className: styles.inputField
              }}
            />
          </GridColumn>
          <GridColumn width={4}>
            <FormikInput
              propsOrFieldName={{
                name: 'zip',
                placeholder: 'ZIP'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={1}>
          <GridColumn width={8}>
            <input
              name="file"
              ref={inputRef}
              type="file"
              onChange={handleFilesSelection}
              style={{ visibility: 'hidden', position: 'absolute' }}
              multiple
              accept="application/pdf"
            />
            <Button
              basic
              className={styles.fileButton}
              content="Upload a PDF copy of your resume here"
              onClick={e => handleClick(e)}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={1}>
          <GridColumn width={14}>
            <FormikTextArea
              propsOrFieldName={{
                rows: 10,
                name: 'message',
                placeholder: 'Leave your message here'
              }}
              semanticProps={{
                className: styles.inputField
              }}
            />
          </GridColumn>
        </GridRow>
      </Grid>
      <Button
        className={styles.form_button}
        color="orange"
        content="SUBMIT"
        type="submit"
        disabled={_.isEqualWith(initialValues, values, nilAreEqual)}
      />
    </Form>
  );
};

export default withFormik<IJoinOurTeamFormProps, IFormValues>({
  displayName: 'GetInTouchForm',
  enableReinitialize: true,
  validationSchema,
  handleSubmit: ((values, { props }) => {
    props.saveChanges(values);
  })
})(JoinOurTeamForm);
