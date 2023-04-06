/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchLookupValue
// ====================================================

export interface fetchLookupValue_fetchLookupValue {
  __typename: "LookupValue";
  id: string;
  isActive: boolean;
  name: string;
  icon: string;
  order: number;
  lookupId: string;
  lastEdited: string;
}

export interface fetchLookupValue {
  fetchLookupValue: fetchLookupValue_fetchLookupValue[];
}

export interface fetchLookupValueVariables {
  id: string;
}
