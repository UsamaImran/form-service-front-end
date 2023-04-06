import { UpdateMultiForm, DeleteForm, UpdateIndexSetting, AddForm } from '../../graphql/mutation'
import { GetIndexSetting } from '../../graphql/queries'
import { updateMultiFormVariables } from '../../graphql/types/updateMultiForm'
import { executeMutation, executeQuery, TStatement } from '../../service/apiService'
import { deleteFormVariables } from '../../graphql/types/deleteForm'
import { updateIndexSettingVariables } from '../../graphql/types/updateIndexSetting'
import { addFormVariables } from '../../graphql/types/addForm'

export const addForms = (input: addFormVariables): Promise<any> => {
  const statement: TStatement = {
    statement: AddForm,
    name: 'addForm',
  }
  return executeMutation(statement, { ...input })
}
export const updateForms = (input: updateMultiFormVariables): Promise<any> => {
  const statement: TStatement = {
    statement: UpdateMultiForm,
    name: 'updateMultiForm',
  }
  return executeMutation(statement, { ...input })
}

export const deleteForms = (input: deleteFormVariables): Promise<any> => {
  const statement: TStatement = {
    statement: DeleteForm,
    name: 'deleteForm',
  }
  return executeMutation(statement, { ...input })
}

export const getIndexSetting = (): Promise<any> => {
  const statement: TStatement = {
    statement: GetIndexSetting,
    name: 'getIndexSetting',
  }
  return executeQuery(statement)
}

export const updateIndexSetting = (input: updateIndexSettingVariables): Promise<any> => {
  const statement: TStatement = {
    statement: UpdateIndexSetting,
    name: 'updateIndexSetting',
  }
  return executeMutation(statement, { ...input })
}
