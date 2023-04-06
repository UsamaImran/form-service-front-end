/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateIndexSettingInput, ActionType } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateIndexSetting
// ====================================================

export interface updateIndexSetting_updateIndexSetting_columns {
  __typename: "Column";
  name: string;
  label: string;
  hidden: boolean;
  maxWidth: string;
}

export interface updateIndexSetting_updateIndexSetting_rowAction {
  __typename: "RowAction";
  action: ActionType;
  single: boolean;
  group: boolean;
}

export interface updateIndexSetting_updateIndexSetting_permissions {
  __typename: "Permission";
  logged: boolean;
  users: (string | null)[];
}

export interface updateIndexSetting_updateIndexSetting {
  __typename: "IndexSetting";
  title: string;
  columns: (updateIndexSetting_updateIndexSetting_columns | null)[];
  rowAction: (updateIndexSetting_updateIndexSetting_rowAction | null)[];
  permissions: updateIndexSetting_updateIndexSetting_permissions;
}

export interface updateIndexSetting {
  updateIndexSetting: updateIndexSetting_updateIndexSetting;
}

export interface updateIndexSettingVariables {
  input: UpdateIndexSettingInput;
}
