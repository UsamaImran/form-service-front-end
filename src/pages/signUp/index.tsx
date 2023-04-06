import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Formik } from 'formik'
import { NetworkService } from '../../service/networkService'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../context/authContext/AuthContainer'
import { signUpFormValidationSchema } from '../../schema/signUpFormValidationSchema'
import { ROUTE_SIGN_IN } from '../../constants/routes'
import { LOGO_TEXT } from '../../constants/constants'
import styles from './SignUp.module.scss'
import Loader from '../../components/backdropLoader/Loader'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Divider, Typography } from '@mui/material'
import Logo from '../../components/logo/Logo'
import TextInputField from '../../components/shared/TextInputField'

export default function SignUp() {
  const { checkAuthentication, authenticateUser } = useAuthContext()
  const router = useRouter()
  const [inputValues] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    avatar: '',
    phone: '',
  })
  const [isLoading, showLoader] = React.useState<boolean>(false)
  const [error, setError] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const isAuth = checkAuthentication()
  React.useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth])

  const handleSubmit = async (values: {
    email: string
    password: string
    username: string
    avatar: string
    phone: string
  }) => {
    try {
      setError('')
      const { email, password, phone } = values
      showLoader(true)
      const payload = {
        email,
        password,
        avatar: '',
        username: email,
        phone,
      }
      await NetworkService.RegisterUser(payload)
      const { token, user } = await NetworkService.Login({ email, password })
      authenticateUser(user, token)
      router.push('/')
    } catch (err) {
      console.log('Error while Signing up', err)
      setError(`${err}`)
      showLoader(false)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  return (
    <React.Fragment>
      {error && (
        <div className={styles['error-container']}>
          <img src="/images/warning_amber.svg" />
          &nbsp; &nbsp;
          <label className={styles['label']}>{error}</label>
        </div>
      )}
      {isAuth ? null : (
        <Container component="main" maxWidth="lg">
          {isLoading ? <Loader /> : null}
          <CssBaseline />
          <Formik initialValues={inputValues} validationSchema={signUpFormValidationSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleSubmit, values, errors, handleBlur, touched }) => {
              return (
                <Box className={styles['container']}>
                  <form
                    onSubmit={(e) => {
                      console.log('Submit')
                      e.preventDefault()
                      handleSubmit(e)
                    }}
                    autoComplete="off"
                  >
                    <Box className={styles['logo-container']}>
                      <Logo text={LOGO_TEXT} />
                    </Box>
                    <Box className={styles['heading-container']}>
                      <Typography variant="h6">Sign Up</Typography>
                    </Box>
                    <TextInputField
                      containerClassName="mb-3"
                      type="text"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      labelText="Email Address"
                      placeholder="name@company.com"
                      error={!!errors.email && touched.email}
                      helperText={errors.email && touched.email ? errors.email : ''}
                      variant={'outlined'}
                      sx={{ marginBottom: '24px' }}
                    />

                    <TextInputField
                      containerClassName="mb-3"
                      error={!!errors.password && touched.password}
                      helperText={errors.password && touched.password ? errors.password : ''}
                      labelText="Password "
                      name="password"
                      placeholder="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        endAdornment: values.password ? (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ) : undefined,
                      }}
                      variant={'outlined'}
                      sx={{ marginBottom: '24px' }}
                    />

                    <Button className={styles['sign-up']} disableRipple type="submit" fullWidth variant="contained">
                      Sign Up
                    </Button>

                    <Divider className={styles['divider']}>
                      <span>or</span>
                    </Divider>
                    <Button fullWidth variant="outlined" className={styles['google-button']} type="button">
                      <img src="./images/googleLogo.svg" className={styles['google-img']} /> Sign up with Gmail
                    </Button>
                    <Grid container className={styles['grid-container']}>
                      <Grid item>
                        <span>Already have an account?</span> &nbsp;
                        <Link className={styles['link']} href={ROUTE_SIGN_IN} variant="body2" type="button">
                          Sign In
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
