import React from 'react';
import { FormikProps, withFormik } from 'formik';
import { Button, Form, FormGroup } from 'semantic-ui-react';
import { IBindingCallback1 } from '@models/Callbacks';
import { ILoginData } from '@screens/Authorization/models/LoginData';
import common from '../common.module.scss';
import { Link } from 'react-router-dom';
import FormikInput from '@components/formik/Input';

export interface ILoginFormProps {
  onLoginClick: IBindingCallback1<ILoginData>;
  loginLoading: boolean;
}

interface IFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC<ILoginFormProps & FormikProps<IFormValues>> = props => {
  const { values, handleSubmit, loginLoading } = props;

  return (
    <Form name="loginForm" onSubmit={handleSubmit}>
      <FormikInput
        propsOrFieldName={{
          name: 'email',
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
          placeholder: 'Enter password',
          type: 'password'
        }}
        semanticProps={{
          icon: 'lock',
          iconPosition: 'left'
        }}
      />
      <Button
        fluid
        type="submit"
        disabled={!values.password || !values.email}
        content="Log in"
        loading={loginLoading}
        color="orange"
      />
      <FormGroup inline>
        <Link to="/reset" className={common.small_link}>Forgot password?</Link>
      </FormGroup>
    </Form>
  );
};

export default withFormik<ILoginFormProps, IFormValues>({
  displayName: 'LoginForm',
  handleSubmit: ((values, { props }) => {
    props.onLoginClick(values);
  })
})(LoginForm);
