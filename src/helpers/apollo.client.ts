import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { TOKEN, USER_ID } from '../constants/constants'
import { PUBLIC_ROUTES } from '../constants/routes'
import LocalStorage from '../service/localStorage'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_URL || 'http://localhost:8000/graphql',
})

const unauthorizedLink = onError(({ networkError }) => {
  const statusCode = networkError && 'statusCode' in networkError ? networkError.statusCode : 500
  if (statusCode === 401 || statusCode === 403) {
    LocalStorage.RemoveItem(TOKEN)
    LocalStorage.RemoveItem(USER_ID)
  }
  // if (!PUBLIC_ROUTES.includes(window.location.pathname)) {
  //   window.location.href = `/error?code=${statusCode}`
  // }
})

export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(TOKEN)
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(unauthorizedLink).concat(httpLink),
    cache: new InMemoryCache(),
  })
}
