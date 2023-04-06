import { ILog, INote } from '../../graphql/types/ApiTypes'

export interface ILogContext {
  logs: ILog[]
  totalLogCount: number
  fetchLogs: (currentPage: number) => void
  doLogNoteAction: (logId: string, notes: INote[]) => void
}
