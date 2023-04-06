/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPermissionToForm
// ====================================================

export interface addPermissionToForm_addPermissionToForm {
  __typename: "ResponseData";
  status: number;
  message: string;
}

export interface addPermissionToForm {
  addPermissionToForm: addPermissionToForm_addPermissionToForm;
}

export interface addPermissionToFormVariables {
  ids: string[];
  userIds: string[];
}
