/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ActionType {
  delete = "delete",
  duplicate = "duplicate",
  permission = "permission",
  tag = "tag",
}

export enum PermissionType {
  admin = "admin",
  edit = "edit",
  owner = "owner",
  view = "view",
}

export enum RelationshipType {
  add = "add",
  change = "change",
  delete = "delete",
}

export interface ActionInput {
  action: ActionType;
  single: boolean;
  group: boolean;
}

export interface AddColumnInput {
  name: string;
  defaultLabel: string;
  label: string;
  hidden: boolean;
  maxWidth: string;
}

export interface AddNote {
  logId: string;
  note: string;
}

export interface DeleteNote {
  logId: string;
  noteId: string;
}

export interface FormInput {
  name: string;
  menu: string;
  subMenu: string;
  tags: (string | null)[];
}

export interface FormPermissionInput {
  user: string;
  access: PermissionType;
}

export interface FormUpdateInput {
  id: string;
  name?: string | null;
  menu?: string | null;
  subMenu?: string | null;
  tags?: (string | null)[] | null;
  canDuplicate?: boolean | null;
  canView?: boolean | null;
  permission?: (FormPermissionInput | null)[] | null;
}

export interface IndexSettingInput {
  title: string;
  logged: boolean;
}

export interface LookupInput {
  name: string;
  isActive: boolean;
  tags?: string[] | null;
  description?: string | null;
}

export interface LookupRelationshipInput {
  lookup: string;
  lookupValue: string;
  childLookup: string;
  childLookupValue: string;
  status: RelationshipType;
}

export interface LookupUpdateInput {
  id: string;
  name?: string | null;
  isActive?: boolean | null;
  tags?: string[] | null;
  description?: string | null;
  permission?: FormPermissionInput[] | null;
}

export interface LookupValueInput {
  name: string;
  isActive: boolean;
  icon?: string | null;
  order: number;
  lookupId: string;
}

export interface LookupValueUpdateInput {
  id: string;
  name?: string | null;
  isActive?: boolean | null;
  icon?: string | null;
  order?: number | null;
}

export interface UpdateIndexSettingInput {
  id: string;
  title?: string | null;
  columns?: (AddColumnInput | null)[] | null;
  rowAction?: (ActionInput | null)[] | null;
}

export interface UpdateNote {
  logId: string;
  noteId: string;
  note: string;
}

export interface UserInput {
  email: string;
  password: string;
  username: string;
  avatar: string;
  phone: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
