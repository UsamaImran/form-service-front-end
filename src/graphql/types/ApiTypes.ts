import { fetchLogs_fetchLogs_Logs, fetchLogs_fetchLogs_Logs_notes } from './fetchlogs'
import { fetchLookup_fetchLookup } from './fetchLookup'
import { fetchLookupRelationship_fetchLookupRelationship_lookupValue } from './fetchLookupRelationship'
import { fetchLookupValue_fetchLookupValue } from './fetchLookupValue'
import { fetchUser_fetchUser } from './fetchUser'
import { getAllForms_getAllForms } from './getAllForms'
import {
  getIndexSetting_getIndexSetting,
  getIndexSetting_getIndexSetting_columns,
  getIndexSetting_getIndexSetting_rowAction,
} from './getIndexSetting'

export type IForm = Omit<getAllForms_getAllForms, '__typename'>
export type IUser = Omit<fetchUser_fetchUser, '__typename'>
export interface IIndexSetting extends Omit<getIndexSetting_getIndexSetting, '__typename' | 'rowAction' | 'columns'> {
  rowAction: (IRowAction | null)[]
  columns: (IIndexColumn | null)[]
}
export type IRowAction = Omit<getIndexSetting_getIndexSetting_rowAction, '__typename'>
export type IIndexColumn = Omit<getIndexSetting_getIndexSetting_columns, '__typename'>
export type INote = Omit<fetchLogs_fetchLogs_Logs_notes, '__typename'>

export interface ILog extends Omit<fetchLogs_fetchLogs_Logs, '__typename' | 'notes'> {
  notes: INote[]
}

export interface IMenuOption {
  id: number
  label: string
  logo: string //it should be an image source
  type: string
}
export type ILookup = Omit<fetchLookup_fetchLookup, '__typename'>
export type ILookupValue = Omit<fetchLookupValue_fetchLookupValue, '__typename'>
// export type ILookupRelationship = Omit<fetchLookupRelationship_fetchLookupRelationship_lookupValue, '__typename'>
