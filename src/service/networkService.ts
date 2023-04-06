import { FetchLogs, FetchUsers, FetchForms, Login, FetchUser } from '../graphql/queries'
import {
  addLogNote,
  AddUserToForms,
  CreateUser,
  deleteLogNote,
  DuplicateForm,
  UpdateFormPermission,
  updateLogNote,
  UpdateMultiForm,
} from '../graphql/mutation'
import { loginVariables } from '../graphql/types/login'
import { updateFormPermissionVariables } from '../graphql/types/updateFormPermission'
import { executeQuery, executeMutation, TStatement } from './apiService'
import { duplicateFormVariables } from '../graphql/types/duplicateForm'
import { getAllFormsVariables } from '../graphql/types/getAllForms'
import { updateMultiFormVariables } from '../graphql/types/updateMultiForm'
import { addUserToFormVariables } from '../graphql/types/addUserToForm'
import { AddNote, DeleteNote, UpdateNote, UserInput } from '../graphql/types/graphql-global-types'
import { fetchUserVariables } from '../graphql/types/fetchUser'

export class NetworkService {
  static async Login(input: loginVariables): Promise<any> {
    const statement: TStatement = {
      statement: Login,
      name: 'login',
    }
    return executeQuery(statement, { ...input })
  }

  static async FetchUsers(): Promise<any> {
    const statement: TStatement = {
      statement: FetchUsers,
      name: 'fetchUsers',
    }
    return executeQuery(statement)
  }

  static async FetchUser(input: fetchUserVariables): Promise<any> {
    const statement: TStatement = {
      statement: FetchUser,
      name: 'fetchUser',
    }
    return executeQuery(statement, { ...input })
  }

  static async FetchForms(input: getAllFormsVariables = {}): Promise<any> {
    const statement: TStatement = {
      statement: FetchForms,
      name: 'getAllForms',
    }
    return executeQuery(statement, { ...input })
  }

  static async UpdateFormPermission(input: updateFormPermissionVariables): Promise<any> {
    const statement: TStatement = {
      statement: UpdateFormPermission,
      name: 'updateFormPermission',
    }
    return executeMutation(statement, { ...input })
  }

  static async DuplicateForm(input: duplicateFormVariables): Promise<any> {
    const statement: TStatement = {
      statement: DuplicateForm,
      name: 'duplicateForm',
    }
    return executeMutation(statement, { ...input })
  }
  static async AddUserToForm(input: addUserToFormVariables): Promise<any> {
    const statement: TStatement = {
      statement: AddUserToForms,
      name: 'addUserToForm',
    }
    return executeMutation(statement, { ...input })
  }
  static async UpdateMultiForm(input: updateMultiFormVariables): Promise<any> {
    const statement: TStatement = {
      statement: UpdateMultiForm,
      name: 'updateMultiForm',
    }
    return executeMutation(statement, { ...input })
  }

  static async FetchLogs(input: { limit: number; offset: number }): Promise<any> {
    const statement: TStatement = {
      statement: FetchLogs,
      name: 'fetchLogs',
    }
    return executeQuery(statement, { ...input })
  }

  static DeleteLogsNote(input: DeleteNote): Promise<any> {
    const statement: TStatement = {
      statement: deleteLogNote,
      name: 'deleteLogNote',
    }
    return executeMutation(statement, { note: input })
  }

  static UpdateLogNote(input: UpdateNote): Promise<any> {
    const statement: TStatement = {
      statement: updateLogNote,
      name: 'updateLogNote',
    }
    return executeMutation(statement, { note: input })
  }

  static AddLogNote(input: AddNote): Promise<any> {
    const statement: TStatement = {
      statement: addLogNote,
      name: 'addLogNote',
    }
    return executeMutation(statement, { note: input })
  }
  static RegisterUser(input: UserInput): Promise<any> {
    const statement: TStatement = {
      statement: CreateUser,
      name: 'createUser',
    }
    return executeMutation(statement, { input })
  }
}
