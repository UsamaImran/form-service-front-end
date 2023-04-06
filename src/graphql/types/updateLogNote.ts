/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateNote } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateLogNote
// ====================================================

export interface updateLogNote_updateLogNote_notes {
  __typename: "Note";
  id: string;
  note: string;
  editedAt: string;
  username: string;
}

export interface updateLogNote_updateLogNote {
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
  notes: updateLogNote_updateLogNote_notes[];
}

export interface updateLogNote {
  updateLogNote: updateLogNote_updateLogNote;
}

export interface updateLogNoteVariables {
  note?: UpdateNote | null;
}
