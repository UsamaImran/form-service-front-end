/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: getAllForms
// ====================================================

export interface getAllForms_getAllForms_createdBy {
  __typename: "User";
  email: string;
  username: string;
  avatar: string;
}

export interface getAllForms_getAllForms_permission_user {
  __typename: "User";
  _id: string;
  username: string;
  avatar: string;
  email: string;
}

export interface getAllForms_getAllForms_permission {
  __typename: "FormPermission";
  access: PermissionType;
  user: getAllForms_getAllForms_permission_user;
}

export interface getAllForms_getAllForms {
  __typename: "Form";
  id: string;
  name: string;
  menu: string;
  subMenu: string;
  tags: (string | null)[];
  canDuplicate: boolean;
  canView: boolean;
  lastEdited: string;
  createdDate: string;
  createdBy: getAllForms_getAllForms_createdBy;
  permission: (getAllForms_getAllForms_permission | null)[];
}

export interface getAllForms {
  getAllForms: (getAllForms_getAllForms | null)[];
}

export interface getAllFormsVariables {
  offset?: number | null;
  limit?: number | null;
}
