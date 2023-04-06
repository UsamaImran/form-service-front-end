/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IndexSettingInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createIndexSetting
// ====================================================

export interface createIndexSetting_createIndexSetting_columns {
  __typename: "Column";
  name: string;
  label: string;
  hidden: boolean;
  maxWidth: string;
}

export interface createIndexSetting_createIndexSetting_rowAction {
  __typename: "RowAction";
  single: boolean;
  group: boolean;
}

export interface createIndexSetting_createIndexSetting_permissions {
  __typename: "Permission";
  logged: boolean;
}

export interface createIndexSetting_createIndexSetting {
  __typename: "IndexSetting";
  title: string;
  columns: (createIndexSetting_createIndexSetting_columns | null)[];
  rowAction: (createIndexSetting_createIndexSetting_rowAction | null)[];
  permissions: createIndexSetting_createIndexSetting_permissions;
}

export interface createIndexSetting {
  createIndexSetting: createIndexSetting_createIndexSetting;
}

export interface createIndexSettingVariables {
  input?: IndexSettingInput | null;
}
