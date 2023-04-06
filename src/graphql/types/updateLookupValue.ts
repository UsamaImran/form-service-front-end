/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupValueUpdateInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateLookupValue
// ====================================================

export interface updateLookupValue_updateLookupValue_editedBy {
  __typename: "User";
  _id: string;
}

export interface updateLookupValue_updateLookupValue {
  __typename: "LookupValue";
  id: string;
  isActive: boolean;
  name: string;
  icon: string;
  order: number;
  lookupId: string;
  lastEdited: string;
  editedBy: updateLookupValue_updateLookupValue_editedBy;
}

export interface updateLookupValue {
  updateLookupValue: updateLookupValue_updateLookupValue;
}

export interface updateLookupValueVariables {
  input: LookupValueUpdateInput;
}
