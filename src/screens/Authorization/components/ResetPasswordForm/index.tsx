import React from 'react';
import * as Yup from 'yup';
import { FormikProps, withFormik } from 'formik';
import { IBindingCallback1 } from '@models/Callbacks';
import { passwordValidation, repeatPasswordValidation } from '@screens/Authorization/components/validation';
import { Button, Form, FormInput } from 'semantic-ui-react';
import styles from './styles.module.scss';
import ErrorPopup from '@components/FormErrorPopup';

export interface IResetPasswordFormProps {
  resetLoading: boolean;
  onResetClick: IBindingCallback1<string>;
}

const validationSchema = Yup.object().shape({
  password: passwordValidation,
  repeatPassword: repeatPasswordValidation
});

interface IFormValues {
  password: string;
  repeatPassword: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps & FormikProps<IFormValues>> = (
  { values, touched, errors, handleChange, resetLoading, handleSubmit }
) => (
  <Form onSubmit={handleSubmit}>
    <ErrorPopup
      open={false}
      label={errors.password}
      component={(
        <>
          <FormInput
            autoFocus
            icon="lock"
            type="password"
            placeholder="Enter new password"
            iconPosition="left"
            name="password"
            onChange={handleChange}
            error={errors.password && touched.password}
          />
          <div className={styles.inputGuide}>
            <p>
              * Password size must be between 8 and 40 characters,
              must start with a letter, contain one uppercase letter and a special character.
            </p>
          </div>
        </>
      )}
    />
    <ErrorPopup
      open={false}
      label={errors.repeatPassword}
      component={(
        <>
          <FormInput
            icon="lock"
            placeholder="Repeat new password"
            iconPosition="left"
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            error={errors.repeatPassword && touched.repeatPassword}
          />
          <div className={styles.inputGuide}>
            <p>
              * Both passwords need to be the same.
            </p>
          </div>
        </>
      )}
    />
    <div className={styles.button_container}>
      <Button
        className={styles.confirm_button}
        color="orange"
        type="submit"
        loading={resetLoading}
        disabled={!values.password || !values.repeatPassword}
        content="Confirm"
      />
    </div>
  </Form>
);

export default withFormik<IResetPasswordFormProps, IFormValues>({
  displayName: 'PasswordResetForm',
  validationSchema,
  handleSubmit: (values, { props }) => {
    props.onResetClick(values.password);
  }
})(ResetPasswordForm);
