import { gql } from '@apollo/client'

export const CreateUser = gql`
  mutation createUser($input: UserInput) {
    createUser(userInput: $input) {
      email
    }
  }
`
export const AddForm = gql`
  mutation addForm($input: FormInput) {
    addForm(formInput: $input) {
      name
      menu
      tags
      subMenu
      lastEdited
      createdDate
      permission {
        access
      }
    }
  }
`

export const DeleteForm = gql`
  mutation deleteForm($input: [String!]!) {
    deleteForm(id: $input) {
      status
    }
  }
`

export const DuplicateForm = gql`
  mutation duplicateForm($id: String!) {
    duplicateForm(id: $id) {
      id
      name
      menu
      subMenu
      tags
      createdBy {
        email
        username
        avatar
      }
      editedBy
      lastEdited
      createdDate
      permission {
        access
        user {
          username
          avatar
        }
      }
    }
  }
`
export const UpdateMultiForm = gql`
  mutation updateMultiForm($updateFormInput: [FormUpdateInput!]!) {
    updateMultiForm(updateFormInput: $updateFormInput) {
      status
    }
  }
`
export const UpdateFormPermission = gql`
  mutation updateFormPermission($id: [String!]!, $userId: String!, $access: PermissionType!) {
    updateFormPermission(id: $id, userId: $userId, access: $access) {
      status
      message
    }
  }
`
export const AddUserToForms = gql`
  mutation addUserToForm($ids: [String!]!, $userIds: [String!]!) {
    addUserToForm(ids: $ids, userIds: $userIds) {
      status
      message
    }
  }
`
export const CreateIndexSetting = gql`
  mutation createIndexSetting($input: IndexSettingInput) {
    createIndexSetting(indexSetting: $input) {
      title
      columns {
        name
        label
        hidden
        maxWidth
      }
      rowAction {
        single {
          action
          status
        }
        group {
          action
          status
        }
      }
      permissions {
        logged
      }
    }
  }
`
export const deleteLogNote = gql`
  mutation deleteLogNote($note: DeleteNote) {
    deleteLogNote(note: $note) {
      id
      date
      hour
      action
      setting
      path
      subPath
      oldValue
      newValue
      createdAt
      userId
      entityId
      entityName
      department
      notes {
        id
        note
        editedAt
        username
      }
    }
  }
`

export const updateLogNote = gql`
  mutation updateLogNote($note: UpdateNote) {
    updateLogNote(note: $note) {
      id
      date
      hour
      action
      setting
      path
      subPath
      oldValue
      newValue
      createdAt
      userId
      entityId
      entityName
      department
      notes {
        id
        note
        editedAt
        username
      }
    }
  }
`
export const addLogNote = gql`
  mutation addLogNote($note: AddNote) {
    addLogNote(note: $note) {
      id
      date
      hour
      action
      setting
      path
      subPath
      oldValue
      newValue
      createdAt
      userId
      entityId
      entityName
      department
      notes {
        id
        note
        editedAt
        username
      }
    }
  }
`
export const UpdateIndexSetting = gql`
  mutation updateIndexSetting($input: UpdateIndexSettingInput!) {
    updateIndexSetting(input: $input) {
      title
      columns {
        name
        label
        hidden
        maxWidth
      }
      rowAction {
        action
        single
        group
      }
      permissions {
        logged
        users
      }
    }
  }
`
export const CreateLookup = gql`
  mutation createLookup($input: LookupInput!) {
    createLookup(input: $input) {
      id
      name
      isActive
      tags
      description
      action
      canDuplicate
      canView
      createdBy {
        _id
      }
      createdAt
      editedBy {
        _id
      }
      lastEdited
      permission {
        id
        access
        user {
          _id
        }
      }
    }
  }
`
export const UpdateLookup = gql`
  mutation updateLookup($input: LookupUpdateInput!) {
    updateLookup(input: $input) {
      id
      name
      isActive
      tags
      description
      action
      canDuplicate
      canView
      createdBy {
        _id
      }
      createdAt
      editedBy {
        _id
      }
      lastEdited
      permission {
        id
        access
        user {
          _id
        }
      }
    }
  }
`

export const DeleteLookup = gql`
  mutation deleteLookup($id: [String!]!) {
    deleteLookup(id: $id) {
      status
    }
  }
`
export const CreateLookupValue = gql`
  mutation createLookupValue($input: LookupValueInput!) {
    createLookupValue(input: $input) {
      id
      isActive
      name
      icon
      order
      lookupId
      lastEdited
      editedBy {
        _id
      }
    }
  }
`
export const CreateLookupValues = gql`
  mutation createLookupValues($input: [LookupValueInput!]!) {
    createLookupValues(input: $input) {
      id
      isActive
      name
      icon
      order
      lookupId
      lastEdited
      editedBy {
        _id
      }
    }
  }
`

export const UpdateLookupValue = gql`
  mutation updateLookupValue($input: LookupValueUpdateInput!) {
    updateLookupValue(input: $input) {
      id
      isActive
      name
      icon
      order
      lookupId
      lastEdited
      editedBy {
        _id
      }
    }
  }
`
export const DeleteLookupValue = gql`
  mutation deleteLookupValue($id: [String!]!) {
    deleteLookupValue(id: $id) {
      status
    }
  }
`
export const CreateLookupRelationship = gql`
  mutation createRelationship($input: [LookupRelationshipInput!]!) {
    createRelationship(input: $input) {
      status
    }
  }
`
