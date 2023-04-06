import { executeMutation, executeQuery, TStatement } from './apiService'
import { FetchLookup, FetchLookupRelationship, FetchLookupValue } from '../graphql/queries'
import { fetchLookupValueVariables } from '../graphql/types/fetchLookupValue'
import { fetchLookupRelationshipVariables } from '../graphql/types/fetchLookupRelationship'
import { fetchLookupVariables } from '../graphql/types/fetchLookup'
import { createLookupVariables } from '../graphql/types/createLookup'
import { updateLookupVariables } from '../graphql/types/updateLookup'
import {
  CreateLookup,
  CreateLookupRelationship,
  CreateLookupValue,
  CreateLookupValues,
  DeleteLookup,
  DeleteLookupValue,
  UpdateLookup,
  UpdateLookupValue,
} from '../graphql/mutation'
import { deleteLookupVariables } from '../graphql/types/deleteLookup'
import { createLookupValueVariables } from '../graphql/types/createLookupValue'
import { createLookupValuesVariables } from '../graphql/types/createLookupValues'
import { updateLookupValueVariables } from '../graphql/types/updateLookupValue'
import { deleteLookupValueVariables } from '../graphql/types/deleteLookupValue'
import { createRelationshipVariables } from '../graphql/types/createRelationship'

export const fetchLookup = (input: fetchLookupVariables): Promise<any> => {
  const statement: TStatement = {
    statement: FetchLookup,
    name: 'fetchLookup',
  }
  return executeQuery(statement, { ...input })
}

export const fetchLookupValue = (input: fetchLookupValueVariables): Promise<any> => {
  const statement: TStatement = {
    statement: FetchLookupValue,
    name: 'fetchLookupValue',
  }
  return executeQuery(statement, { ...input })
}

export const fetchLookupRelationship = (input: fetchLookupRelationshipVariables): Promise<any> => {
  const statement: TStatement = {
    statement: FetchLookupRelationship,
    name: 'fetchLookupRelationship',
  }
  return executeQuery(statement, { ...input })
}

export const createLookup = (input: createLookupVariables): Promise<any> => {
  const statement: TStatement = {
    statement: CreateLookup,
    name: 'createLookup',
  }
  return executeMutation(statement, { ...input })
}

export const updateLookup = (input: updateLookupVariables): Promise<any> => {
  const statement: TStatement = {
    statement: UpdateLookup,
    name: 'updateLookup',
  }
  return executeMutation(statement, { ...input })
}

export const deleteLookup = (input: deleteLookupVariables): Promise<any> => {
  const statement: TStatement = {
    statement: DeleteLookup,
    name: 'deleteLookup',
  }
  return executeMutation(statement, { ...input })
}

export const createLookupValue = (input: createLookupValueVariables): Promise<any> => {
  const statement: TStatement = {
    statement: CreateLookupValue,
    name: 'createLookupValue',
  }
  return executeMutation(statement, { ...input })
}

export const createLookupValues = (input: createLookupValuesVariables): Promise<any> => {
  const statement: TStatement = {
    statement: CreateLookupValues,
    name: 'createLookupValues',
  }
  return executeMutation(statement, { ...input })
}

export const updateLookupValue = (input: updateLookupValueVariables): Promise<any> => {
  const statement: TStatement = {
    statement: UpdateLookupValue,
    name: 'updateLookupValue',
  }
  return executeMutation(statement, { ...input })
}

export const deleteLookupValue = (input: deleteLookupValueVariables): Promise<any> => {
  const statement: TStatement = {
    statement: DeleteLookupValue,
    name: 'deleteLookupValue',
  }
  return executeMutation(statement, { ...input })
}

export const createRelationship = (input: createRelationshipVariables): Promise<any> => {
  const statement: TStatement = {
    statement: CreateLookupRelationship,
    name: 'createRelationship',
  }
  return executeMutation(statement, { ...input })
}
