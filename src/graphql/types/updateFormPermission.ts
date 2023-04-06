/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateFormPermission
// ====================================================

export interface updateFormPermission_updateFormPermission {
  __typename: "ResponseData";
  status: number;
  message: string;
}

export interface updateFormPermission {
  updateFormPermission: updateFormPermission_updateFormPermission;
}

export interface updateFormPermissionVariables {
  id: string[];
  userId: string;
  access: PermissionType;
}
