import * as Yup from 'yup'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/constants'

const invalidMessage = 'Invalid email address'
const invalidPasswordMessage = 'Password must be at least 8 characters'
// const invalidUsernameMessage = 'Invalid username provided'
// const invalidPhoneMessage = 'Invalid phone number provided'
export const signUpFormValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email address required!').matches(EMAIL_REGEX, invalidMessage),
  // username: Yup.string().required('Username required!').matches(USERNAME_REGEX, invalidUsernameMessage),
  // phone: Yup.string().required('Phone number required!').matches(PHONE_REGEX, invalidPhoneMessage),
  password: Yup.string().required('Password required!').matches(PASSWORD_REGEX, invalidPasswordMessage),
  // confirmPassword: Yup.string().when('password', {
  //   is: (val: string) => (val && val.length > 0 ? true : false),
  //   then: Yup.string().oneOf([Yup.ref('password')], `The passwords didn't match.`),
  // }),
})
