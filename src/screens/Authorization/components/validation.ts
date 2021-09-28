import * as Yup from 'yup';
import { Regex } from '@models/domain/Regex';

export const passwordValidation = Yup.string()
  .required('Password is required')
  .matches(new RegExp(Regex.PASSWORD_REGEX),
    'Password has to be longer than 8 characters'
    + ' and has be no more than 40 characters,'
    + ' must start with a letter,'
    + ' contain one uppercase letter and a special character.');

export const repeatPasswordValidation = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
  .required('Password confirm is required');

export const emailValidation = Yup.string()
  .email('Email must be correct')
  .required('E-mail is required');
