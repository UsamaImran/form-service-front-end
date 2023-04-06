import { gql } from '@apollo/client'

export const Login = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        email
        password
        username
        avatar
        phone
      }
      token
    }
  }
`
export const FetchUsers = gql`
  query fetchUsers {
    fetchUsers {
      _id
      email
      username
      avatar
    }
  }
`
export const FetchUser = gql`
  query fetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      _id
      email
      username
      avatar
      phone
    }
  }
`

export const GetIndexSetting = gql`
  query getIndexSetting {
    getIndexSetting {
      id
      title
      columns {
        name
        defaultLabel
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

export const FetchForms = gql`
  query getAllForms($offset: Int, $limit: Int) {
    getAllForms(offset: $offset, limit: $limit) {
      id
      name
      menu
      subMenu
      tags
      canDuplicate
      canView
      lastEdited
      createdDate
      createdBy {
        email
        username
        avatar
      }
      permission {
        access
        user {
          _id
          username
          avatar
          email
        }
      }
    }
  }
`

export const FetchLogs = gql`
  query fetchLogs($limit: Int, $offset: Int) {
    fetchLogs(limit: $limit, offset: $offset) {
      Logs {
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
      totalLogs
    }
  }
`
export const FetchLookup = gql`
  query fetchLookup($limit: Int, $offset: Int) {
    fetchLookup(limit: $limit, offset: $offset) {
      id
      name
      isActive
      tags
      description
      action
      canDuplicate
      canView
      editedBy {
        username
        avatar
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
export const FetchLookupValue = gql`
  query fetchLookupValue($id: String!) {
    fetchLookupValue(id: $id) {
      id
      isActive
      name
      icon
      order
      lookupId
      lastEdited
    }
  }
`
export const FetchLookupRelationship = gql`
  query fetchLookupRelationship($id: String!) {
    fetchLookupRelationship(id: $id) {
      lookup {
        id
        name
      }
      lookupValue {
        id
        name
      }
      childLookup {
        id
        name
      }
      childLookupValue {
        id
        name
      }
    }
  }
`
