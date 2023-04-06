import { ApolloQueryResult, DocumentNode } from '@apollo/client'
import { getApolloClient } from '../helpers/apollo.client'

export type TStatement = {
  statement: DocumentNode
  name: string
}

export const executeQuery = async (
  { statement, name }: TStatement,
  variables: any = {},
): Promise<ApolloQueryResult<any>> => {
  try {
    const client = getApolloClient()
    const { data } = await client.query({
      query: statement,
      variables: {
        ...variables,
      },
    })
    return data[name]
  } catch (err) {
    console.log('error in execute', JSON.stringify(err))
    throw err
  }
}

export const executeMutation = async (
  { statement, name }: TStatement,
  variables: any,
): Promise<ApolloQueryResult<any>> => {
  try {
    const client = getApolloClient()

    const { data } = await client.mutate({
      mutation: statement,
      variables: {
        ...variables,
      },
    })
    return data[name]
  } catch (err) {
    console.log('error in execute', JSON.stringify(err))
    throw err
  }
}
