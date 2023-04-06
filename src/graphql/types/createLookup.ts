/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupInput, PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createLookup
// ====================================================

export interface createLookup_createLookup_createdBy {
  __typename: "User";
  _id: string;
}

export interface createLookup_createLookup_editedBy {
  __typename: "User";
  _id: string;
}

export interface createLookup_createLookup_permission_user {
  __typename: "User";
  _id: string;
}

export interface createLookup_createLookup_permission {
  __typename: "FormPermission";
  id: string;
  access: PermissionType;
  user: createLookup_createLookup_permission_user;
}

export interface createLookup_createLookup {
  __typename: "Lookup";
  id: string;
  name: string;
  isActive: boolean;
  tags: string[];
  description: string;
  action: string;
  canDuplicate: boolean;
  canView: boolean;
  createdBy: createLookup_createLookup_createdBy;
  createdAt: string;
  editedBy: createLookup_createLookup_editedBy;
  lastEdited: string;
  permission: createLookup_createLookup_permission[];
}

export interface createLookup {
  createLookup: createLookup_createLookup;
}

export interface createLookupVariables {
  input: LookupInput;
}
