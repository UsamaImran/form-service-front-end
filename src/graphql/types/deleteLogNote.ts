/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteNote } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: deleteLogNote
// ====================================================

export interface deleteLogNote_deleteLogNote_notes {
  __typename: "Note";
  id: string;
  note: string;
  editedAt: string;
  username: string;
}

export interface deleteLogNote_deleteLogNote {
  __typename: "Log";
  id: string;
  date: string;
  hour: string;
  action: string;
  setting: string | null;
  path: string;
  subPath: string | null;
  oldValue: string;
  newValue: string;
  createdAt: string;
  userId: string;
  entityId: string;
  entityName: string;
  department: string | null;
  notes: deleteLogNote_deleteLogNote_notes[];
}

export interface deleteLogNote {
  deleteLogNote: deleteLogNote_deleteLogNote;
}

export interface deleteLogNoteVariables {
  note?: DeleteNote | null;
}
