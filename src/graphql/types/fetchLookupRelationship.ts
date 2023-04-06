/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchLookupRelationship
// ====================================================

export interface fetchLookupRelationship_fetchLookupRelationship_lookup {
  __typename: "Lookup";
  id: string;
  name: string;
}

export interface fetchLookupRelationship_fetchLookupRelationship_lookupValue {
  __typename: "LookupValue";
  id: string;
  name: string;
}

export interface fetchLookupRelationship_fetchLookupRelationship_childLookup {
  __typename: "Lookup";
  id: string;
  name: string;
}

export interface fetchLookupRelationship_fetchLookupRelationship_childLookupValue {
  __typename: "LookupValue";
  id: string;
  name: string;
}

export interface fetchLookupRelationship_fetchLookupRelationship {
  __typename: "LookupRelationship";
  lookup: fetchLookupRelationship_fetchLookupRelationship_lookup;
  lookupValue: fetchLookupRelationship_fetchLookupRelationship_lookupValue;
  childLookup: fetchLookupRelationship_fetchLookupRelationship_childLookup;
  childLookupValue: fetchLookupRelationship_fetchLookupRelationship_childLookupValue;
}

export interface fetchLookupRelationship {
  fetchLookupRelationship: fetchLookupRelationship_fetchLookupRelationship[];
}

export interface fetchLookupRelationshipVariables {
  id: string;
}
