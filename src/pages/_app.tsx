import React from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { getApolloClient } from '../helpers/apollo.client'
import { CompanyContextContainer as CompanyContainer } from '../context/companyContext/CompanyContainer'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme/theme'
import dynamic from 'next/dynamic'
import ProtectedRoute from '../hoc/ProtectedRoute'

const AuthProvider = dynamic(() => import('../context/authContext/AuthContainer'), {
  ssr: false,
})

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={getApolloClient()}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CompanyContainer>
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          </CompanyContainer>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
