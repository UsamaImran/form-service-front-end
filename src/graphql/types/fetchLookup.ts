/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: fetchLookup
// ====================================================

export interface fetchLookup_fetchLookup_editedBy {
  __typename: "User";
  username: string;
  avatar: string;
}

export interface fetchLookup_fetchLookup_permission_user {
  __typename: "User";
  _id: string;
}

export interface fetchLookup_fetchLookup_permission {
  __typename: "FormPermission";
  id: string;
  access: PermissionType;
  user: fetchLookup_fetchLookup_permission_user;
}

export interface fetchLookup_fetchLookup {
  __typename: "Lookup";
  id: string;
  name: string;
  isActive: boolean;
  tags: string[];
  description: string;
  action: string;
  canDuplicate: boolean;
  canView: boolean;
  editedBy: fetchLookup_fetchLookup_editedBy;
  lastEdited: string;
  permission: fetchLookup_fetchLookup_permission[];
}

export interface fetchLookup {
  fetchLookup: fetchLookup_fetchLookup[];
}

export interface fetchLookupVariables {
  limit?: number | null;
  offset?: number | null;
}
