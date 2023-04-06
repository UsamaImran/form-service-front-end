/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchLogs
// ====================================================

export interface fetchLogs_fetchLogs_Logs_notes {
  __typename: "Note";
  id: string;
  note: string;
  editedAt: string;
  username: string;
}

export interface fetchLogs_fetchLogs_Logs {
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
  notes: fetchLogs_fetchLogs_Logs_notes[];
}

export interface fetchLogs_fetchLogs {
  __typename: "LogData";
  Logs: fetchLogs_fetchLogs_Logs[];
  totalLogs: number;
}

export interface fetchLogs {
  fetchLogs: fetchLogs_fetchLogs;
}

export interface fetchLogsVariables {
  limit?: number | null;
  offset?: number | null;
}
