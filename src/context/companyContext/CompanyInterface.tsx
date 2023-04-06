import { IForm, IUser } from '../../graphql/types/ApiTypes'

export interface ICompany {
  forms: IForm[]
  users: IUser[]
  refetchForm: () => void
}

export interface ICompanyState {
  forms: IForm[]
  users: IUser[]
}
