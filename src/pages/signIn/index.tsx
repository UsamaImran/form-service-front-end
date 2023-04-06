import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Formik } from 'formik'
import { signInFormValidationSchema } from '../../schema/loginFormValidationSchema'
import { NetworkService } from '../../service/networkService'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../context/authContext/AuthContainer'
import { ROUTE_SIGN_UP } from '../../constants/routes'
import { LOGO_TEXT } from '../../constants/constants'
import styles from './SignIn.module.scss'
import Loader from '../../components/backdropLoader/Loader'
import { Divider, Typography } from '@mui/material'
import Logo from '../../components/logo/Logo'
import TextInputField from '../../components/shared/TextInputField'

export default function SignIn() {
  const { authenticateUser, checkAuthentication } = useAuthContext()
  const router = useRouter()
  const [inputValues] = React.useState({
    email: '',
    password: '',
  })
  const [isLoading, showLoader] = React.useState<boolean>(false)

  const [error, setError] = React.useState('')

  const isAuth = checkAuthentication()
  React.useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth])

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError('')
    try {
      const { email, password } = values
      const payload = {
        email,
        password,
      }
      showLoader(true)
      const { token, user } = await NetworkService.Login(payload)
      authenticateUser(user, token)
      router.push('/')
    } catch (err) {
      console.log('Error while logging in', err)
      setError('Invalid email or password')
      showLoader(false)
    }
  }

  return (
    <React.Fragment>
      {error && (
        <div className={styles['error-container']}>
          <img src="/images/warning_amber.svg" />
          &nbsp; &nbsp;
          <label className={styles['label']}>Wrong email or password </label>
        </div>
      )}

      {isAuth ? null : (
        <Container component="main" maxWidth="xs">
          {isLoading ? <Loader /> : null}
          <CssBaseline />

          <Formik initialValues={inputValues} validationSchema={signInFormValidationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleSubmit, errors, touched, handleBlur }) => {
              return (
                <Box className={styles['container']}>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <Box className={styles['logo-container']}>
                      <Logo text={LOGO_TEXT} />
                    </Box>
                    <Box className={styles['heading-container']}>
                      <Typography variant="h6">Sign In</Typography>
                    </Box>
                    <TextInputField
                      containerClassName="mb-3"
                      type="text"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="Email Address"
                      placeholder="name@company.com"
                      error={!!errors.email && touched.email}
                      helperText={touched.email && errors.email ? errors.email : ''}
                      variant={'outlined'}
                      sx={{ marginBottom: '24px' }}
                    />

                    <TextInputField
                      containerClassName="mb-3"
                      error={!!errors.password && touched.password}
                      helperText={touched.password && errors.password ? errors.password : ''}
                      labelText="Password"
                      name="password"
                      id="password"
                      placeholder="password"
                      type={'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant={'outlined'}
                      sx={{ marginBottom: '24px' }}
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Sign In
                    </Button>
                    <Divider className={styles['divider']}>
                      <span>or</span>
                    </Divider>
                    <Button type="button" fullWidth variant="outlined" className={styles['google-button']}>
                      <img src="./images/googleLogo.svg" className={styles['google-img']} /> Sign up with Gmail
                    </Button>
                    <Grid container className={styles['grid-container']}>
                      <Grid item>
                        <span>New to NGN42?</span> &nbsp;
                        <Link className={styles['link']} href={ROUTE_SIGN_UP} variant="body2" type="button">
                          Create an Account
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              )
            }}
          </Formik>
        </Container>
      )}
    </React.Fragment>
  )
}
