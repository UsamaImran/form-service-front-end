/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupValueInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createLookupValue
// ====================================================

export interface createLookupValue_createLookupValue_editedBy {
  __typename: "User";
  _id: string;
}

export interface createLookupValue_createLookupValue {
  __typename: "LookupValue";
  id: string;
  isActive: boolean;
  name: string;
  icon: string;
  order: number;
  lookupId: string;
  lastEdited: string;
  editedBy: createLookupValue_createLookupValue_editedBy;
}

export interface createLookupValue {
  createLookupValue: createLookupValue_createLookupValue;
}

export interface createLookupValueVariables {
  input: LookupValueInput;
}
