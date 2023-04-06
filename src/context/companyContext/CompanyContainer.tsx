import React, { useContext, useEffect, useCallback, useState } from 'react'
import { CompanyContext, CompanyProvider } from './CompanyContext'
import { ICompany, ICompanyState } from './CompanyInterface'
import { NetworkService } from '../../service/networkService'
import { useAuthContext } from '../authContext/AuthContainer'

const CompanyContextContainer: React.FunctionComponent = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const [state, setState] = useState<ICompanyState>({
    forms: [],
    users: [],
  })
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Fetching Forms')
      fetchUsers()
      fetchForms()
    }
  }, [isAuthenticated])

  const fetchUsers = useCallback(async () => {
    try {
      const users = await NetworkService.FetchUsers()
      setState((prev) => {
        return {
          ...prev,
          users: users,
        }
      })
    } catch (err) {
      console.log('Error while fetching users')
    }
  }, [])

  const fetchForms = useCallback(async () => {
    try {
      const forms = await NetworkService.FetchForms()
      setState((prev) => {
        return {
          ...prev,
          forms: forms,
        }
      })
    } catch (err) {
      console.log('Error while fetching forms')
    }
  }, [])

  return (
    <CompanyProvider
      value={{
        users: state.users,
        forms: state.forms,
        refetchForm: fetchForms,
      }}
    >
      {children}
    </CompanyProvider>
  )
}

export { CompanyContextContainer }

export const useCompanyContext = (): ICompany => {
  return useContext(CompanyContext) as ICompany
}
