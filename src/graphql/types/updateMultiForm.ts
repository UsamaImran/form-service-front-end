/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FormUpdateInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateMultiForm
// ====================================================

export interface updateMultiForm_updateMultiForm {
  __typename: "ResponseData";
  status: number;
}

export interface updateMultiForm {
  updateMultiForm: updateMultiForm_updateMultiForm;
}

export interface updateMultiFormVariables {
  updateFormInput: FormUpdateInput[];
}
