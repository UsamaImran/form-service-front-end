import { IUser } from '../../graphql/types/ApiTypes'

export interface IAuth {
  isAuthenticated: boolean
  user: IUser
  authenticateUser: (user: IUser, token: string) => void
  logoutUser: () => void
  checkAuthentication: () => boolean
}

export interface AuthStateInterface {
  isAuthenticated: boolean
  token: string
  user: IUser
}

export const defaultUser: IUser = {
  _id: '',
  avatar: '',
  email: '',
  phone: '',
  username: '',
}
