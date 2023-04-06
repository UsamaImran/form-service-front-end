/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupValueInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createLookupValues
// ====================================================

export interface createLookupValues_createLookupValues_editedBy {
  __typename: "User";
  _id: string;
}

export interface createLookupValues_createLookupValues {
  __typename: "LookupValue";
  id: string;
  isActive: boolean;
  name: string;
  icon: string;
  order: number;
  lookupId: string;
  lastEdited: string;
  editedBy: createLookupValues_createLookupValues_editedBy;
}

export interface createLookupValues {
  createLookupValues: createLookupValues_createLookupValues[];
}

export interface createLookupValuesVariables {
  input: LookupValueInput[];
}
