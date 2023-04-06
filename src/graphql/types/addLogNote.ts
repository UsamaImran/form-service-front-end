/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddNote } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: addLogNote
// ====================================================

export interface addLogNote_addLogNote_notes {
  __typename: "Note";
  id: string;
  note: string;
  editedAt: string;
  username: string;
}

export interface addLogNote_addLogNote {
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
  notes: addLogNote_addLogNote_notes[];
}

export interface addLogNote {
  addLogNote: addLogNote_addLogNote;
}

export interface addLogNoteVariables {
  note?: AddNote | null;
}
