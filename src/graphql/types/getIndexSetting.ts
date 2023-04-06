/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ActionType } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: getIndexSetting
// ====================================================

export interface getIndexSetting_getIndexSetting_columns {
  __typename: "Column";
  name: string;
  defaultLabel: string;
  label: string;
  hidden: boolean;
  maxWidth: string;
}

export interface getIndexSetting_getIndexSetting_rowAction {
  __typename: "RowAction";
  action: ActionType;
  single: boolean;
  group: boolean;
}

export interface getIndexSetting_getIndexSetting_permissions {
  __typename: "Permission";
  logged: boolean;
  users: (string | null)[];
}

export interface getIndexSetting_getIndexSetting {
  __typename: "IndexSetting";
  id: string;
  title: string;
  columns: (getIndexSetting_getIndexSetting_columns | null)[];
  rowAction: (getIndexSetting_getIndexSetting_rowAction | null)[];
  permissions: getIndexSetting_getIndexSetting_permissions;
}

export interface getIndexSetting {
  getIndexSetting: getIndexSetting_getIndexSetting;
}
