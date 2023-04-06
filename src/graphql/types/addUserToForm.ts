/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addUserToForm
// ====================================================

export interface addUserToForm_addUserToForm {
  __typename: "ResponseData";
  status: number;
  message: string;
}

export interface addUserToForm {
  addUserToForm: addUserToForm_addUserToForm;
}

export interface addUserToFormVariables {
  ids: string[];
  userIds: string[];
}
