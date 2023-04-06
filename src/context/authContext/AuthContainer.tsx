import React, { useContext, useEffect, useState } from 'react'
import { TOKEN, USER_ID } from '../../constants/constants'
import { IUser } from '../../graphql/types/ApiTypes'
import LocalStorage from '../../service/localStorage'
import { NetworkService } from '../../service/networkService'
import { AuthContext, AuthProvider } from './AuthContext'
import { IAuth, AuthStateInterface, defaultUser } from './AuthInterface'
import { useRouter } from 'next/router'
import { ROUTE_SIGN_IN } from '../../constants/routes'

const AuthContextContainer: React.FunctionComponent = ({ children }) => {
  const defaultAuthState: AuthStateInterface = {
    isAuthenticated: false,
    token: '',
    user: defaultUser,
  }

  const route = useRouter()

  const [state, setState] = useState<AuthStateInterface>(defaultAuthState)

  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        isAuthenticated: checkAuthentication(),
      }
    })
  }, [])

  useEffect(() => {
    fetchUser()
  }, [])
  const authenticateUser: (user: IUser, token: string) => void = (user: IUser, token: string): void => {
    LocalStorage.SetItem(TOKEN, token)
    LocalStorage.SetItem(USER_ID, user._id)
    setState((prev) => {
      return {
        ...prev,
        isAuthenticated: true,
        token: token,
        user: user,
      }
    })
  }

  const fetchUser = async () => {
    const userId = LocalStorage.GetItem(USER_ID)
    if (userId) {
      try {
        const user = await NetworkService.FetchUser({ userId: userId })
        setState((prev) => {
          return {
            ...prev,
            user: { ...user },
          }
        })
      } catch (err) {
        console.log('Error while fetching user')
        logoutUser()
      }
    }
  }
  
  const logoutUser: () => void = (): void => {
    LocalStorage.RemoveItem(TOKEN)
    LocalStorage.RemoveItem(USER_ID)
    route.push(ROUTE_SIGN_IN)
    setState((prev) => {
      return {
        ...prev,
        isAuthenticated: false,
      }
    })
  }

  const checkAuthentication: () => boolean = (): boolean => {
    return !!LocalStorage.GetItem(TOKEN)
  }

  return (
    <AuthProvider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        authenticateUser,
        logoutUser,
        checkAuthentication,
      }}
    >
      {children}
    </AuthProvider>
  )
}

export default AuthContextContainer

export const useAuthContext = (): IAuth => {
  return useContext(AuthContext) as IAuth
}
