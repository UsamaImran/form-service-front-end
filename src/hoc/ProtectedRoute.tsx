import { ReactElement } from 'react'
import { useAuthContext } from '../context/authContext/AuthContainer'
import Layout from '../layouts/layout'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }): ReactElement => {
  const { isAuthenticated } = useAuthContext()
  if (!isAuthenticated) {
    return children
  }
  return <Layout>{children}</Layout>
}
export default ProtectedRoute
