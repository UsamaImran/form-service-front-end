/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LookupUpdateInput, PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateLookup
// ====================================================

export interface updateLookup_updateLookup_createdBy {
  __typename: "User";
  _id: string;
}

export interface updateLookup_updateLookup_editedBy {
  __typename: "User";
  _id: string;
}

export interface updateLookup_updateLookup_permission_user {
  __typename: "User";
  _id: string;
}

export interface updateLookup_updateLookup_permission {
  __typename: "FormPermission";
  id: string;
  access: PermissionType;
  user: updateLookup_updateLookup_permission_user;
}

export interface updateLookup_updateLookup {
  __typename: "Lookup";
  id: string;
  name: string;
  isActive: boolean;
  tags: string[];
  description: string;
  action: string;
  canDuplicate: boolean;
  canView: boolean;
  createdBy: updateLookup_updateLookup_createdBy;
  createdAt: string;
  editedBy: updateLookup_updateLookup_editedBy;
  lastEdited: string;
  permission: updateLookup_updateLookup_permission[];
}

export interface updateLookup {
  updateLookup: updateLookup_updateLookup;
}

export interface updateLookupVariables {
  input: LookupUpdateInput;
}
