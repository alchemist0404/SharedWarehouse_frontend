import React from 'react';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';
import { Button, Form, FormGroup } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import styles from './styles.module.scss';
import { IRegistrationData } from '@screens/Authorization/models/RegistrationData';
import { Link } from 'react-router-dom';
import {
  emailValidation,
  passwordValidation,
  repeatPasswordValidation
} from '@screens/Authorization/components/validation';
import ErrorPopup from '@components/FormErrorPopup';
import FormikInput from '@components/formik/Input';

export interface IRegistrationFormProps {
  onRegisterClick: IBindingCallback1<IRegistrationData>;
  registrationLoading: boolean;
}

const validationSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  repeatPassword: repeatPasswordValidation,
  agreed: Yup.boolean()
    .oneOf([true], 'Must Accept Terms and Conditions')
});

interface IFormValues {
  email: string;
  password: string;
  repeatPassword: string;
  agreed: boolean;
}

const RegistrationForm: React.FC<IRegistrationFormProps & FormikProps<IFormValues>> = props => {
  const { values, touched, errors, handleSubmit, registrationLoading, setFieldValue } = props;

  return (
    <Form name="loginForm" onSubmit={handleSubmit}>
      <FormikInput
        propsOrFieldName={{
          name: 'email',
          autoFocus: true,
          placeholder: 'Enter email'
        }}
        semanticProps={{
          icon: 'at',
          iconPosition: 'left'
        }}
      />
      <FormikInput
        propsOrFieldName={{
          name: 'password',
          type: 'password',
          placeholder: 'Enter Password'
        }}
        semanticProps={{
          icon: 'lock',
          iconPosition: 'left'
        }}
      />
      <div className={styles.inputGuide}>
        <p>
          * Password size must be between 8 and 40 characters,
          must start with a letter, contain one uppercase letter and a special character.
        </p>
      </div>
      <FormikInput
        propsOrFieldName={{
          name: 'repeatPassword',
          type: 'password',
          placeholder: 'Repeat password'
        }}
        semanticProps={{
          icon: 'lock',
          iconPosition: 'left'
        }}
      />
      <div className={styles.inputGuide}>
        <p>
          * Both passwords need to be the same.
        </p>
      </div>
      <ErrorPopup
        open={!!(touched.agreed && errors.agreed)}
        label={errors.agreed}
        component={(
          <FormGroup className={styles.terms}>
            <Form.Checkbox
              name="agreed"
              onChange={(e, { name, checked }) => setFieldValue(name, checked)}
              error={errors.agreed && touched.agreed}
            />
            <span>
              I agree to&nbsp;
              <Link to="/terms_and_conditions">terms and conditions</Link>
            </span>
          </FormGroup>
        )}
      />
      <Button
        fluid
        type="submit"
        disabled={!values.password || !values.email || !values.agreed || !values.repeatPassword}
        content="Register"
        loading={registrationLoading}
        color="orange"
      />
    </Form>
  );
};

export default withFormik<IRegistrationFormProps, IFormValues>({
  displayName: 'RegistrationForm',
  validationSchema,
  handleSubmit: ((values, { props }) => {
    props.onRegisterClick({ email: values.email, password: values.password });
  })
})(RegistrationForm);
