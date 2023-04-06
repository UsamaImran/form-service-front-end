import React from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '../context/authContext/AuthContainer'
import { ROUTE_SIGN_IN } from '../constants/routes'

const withAuth = (Component: React.ElementType): React.ElementType => {
  const Auth = () => {
    const router = useRouter()
    const { checkAuthentication } = useAuthContext()
    React.useEffect(() => {
      if (checkAuthentication() === false) {
        router.replace(ROUTE_SIGN_IN)
        return
      }
    }, [checkAuthentication()])
    return checkAuthentication() ? <Component /> : null
  }

  return Auth
}

export default withAuth

