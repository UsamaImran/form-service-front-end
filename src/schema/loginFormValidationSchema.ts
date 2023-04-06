import * as Yup from 'yup'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/constants'

const invalidMessage = 'Invalid email address'
const invalidPasswordMessage = 'Invalid password provided, It should contain atleast one number'

export const signInFormValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email address required!').matches(EMAIL_REGEX, invalidMessage),
  // password: Yup.string().required('Password required!').matches(PASSWORD_REGEX, invalidPasswordMessage),
  password: Yup.string().required('Password required!'),
})
