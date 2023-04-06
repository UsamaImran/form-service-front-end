import { IColumn } from '../table/Table'

// interface ILogTable extends IColumn {}
export const Columns: IColumn[] = [
  { id: 'date', label: 'Date', align: 'left', minWidth: 80 },
  { id: 'hour', label: 'Hour', align: 'left', minWidth: 50 },
  { id: 'user', label: 'User', align: 'left', minWidth: 70, type: 'avatar' },
  { id: 'action', label: 'Action', align: 'left', minWidth: 100 },
  { id: 'path', label: 'Path', align: 'left', minWidth: 150 },
  { id: 'setting', label: 'Setting', align: 'left', minWidth: 140 },
  { id: 'oldValue', label: 'Old Value', align: 'left', minWidth: 220 },
  { id: 'newValue', label: 'New Value', align: 'left', minWidth: 220 },
  { id: 'notes', label: 'Notes', align: 'left', minWidth: 150 },
]
