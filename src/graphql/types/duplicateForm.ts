/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: duplicateForm
// ====================================================

export interface duplicateForm_duplicateForm_createdBy {
  __typename: "User";
  email: string;
  username: string;
  avatar: string;
}

export interface duplicateForm_duplicateForm_permission_user {
  __typename: "User";
  username: string;
  avatar: string;
}

export interface duplicateForm_duplicateForm_permission {
  __typename: "FormPermission";
  access: PermissionType;
  user: duplicateForm_duplicateForm_permission_user;
}

export interface duplicateForm_duplicateForm {
  __typename: "Form";
  id: string;
  name: string;
  menu: string;
  subMenu: string;
  tags: (string | null)[];
  createdBy: duplicateForm_duplicateForm_createdBy;
  editedBy: string;
  lastEdited: string;
  createdDate: string;
  permission: (duplicateForm_duplicateForm_permission | null)[];
}

export interface duplicateForm {
  duplicateForm: duplicateForm_duplicateForm;
}

export interface duplicateFormVariables {
  id: string;
}
