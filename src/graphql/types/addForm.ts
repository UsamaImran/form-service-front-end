/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FormInput, PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: addForm
// ====================================================

export interface addForm_addForm_permission {
  __typename: "FormPermission";
  access: PermissionType;
}

export interface addForm_addForm {
  __typename: "Form";
  name: string;
  menu: string;
  tags: (string | null)[];
  subMenu: string;
  lastEdited: string;
  createdDate: string;
  permission: (addForm_addForm_permission | null)[];
}

export interface addForm {
  addForm: addForm_addForm;
}

export interface addFormVariables {
  input?: FormInput | null;
}
