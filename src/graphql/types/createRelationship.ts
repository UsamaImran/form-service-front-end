/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupRelationshipInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createRelationship
// ====================================================

export interface createRelationship_createRelationship {
  __typename: "ResponseData";
  status: number;
}

export interface createRelationship {
  createRelationship: createRelationship_createRelationship;
}

export interface createRelationshipVariables {
  input: LookupRelationshipInput[];
}
