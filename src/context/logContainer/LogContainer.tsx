import React, { useContext, useState } from 'react'
import { LogContext, LogProvider } from './LogContext'
import { ILogContext } from './LogInterface'
import { NetworkService } from '../../service/networkService'
import { ILog, INote } from '../../graphql/types/ApiTypes'

const LogContextContainer: React.FunctionComponent = ({ children }) => {
  const [logs, setLogs] = useState<ILog[]>([])
  const [totalLogs, setTotalLog] = useState<number>(0)
  const fetchLogs = async (currentPage: number) => {
    try {
      const { Logs, totalLogs } = await NetworkService.FetchLogs({ limit: 100, offset: currentPage })
      setLogs([...logs, ...Logs])
      setTotalLog(totalLogs)
    } catch (err) {
      console.log('Error while fetching Logs')
    }
  }

  const doLogAction = (logId: string, notes: INote[]) => {
    const index = logs.findIndex((item) => {
      return item.id === logId
    })

    if (index >= 0) {
      const updatedLogs = [...logs]
      const allData = { ...logs[index] }
      allData.notes = [...notes]
      updatedLogs.splice(index, 1, allData)
      setLogs([...updatedLogs])
    }
    // switch (action) {
    // }
  }

  return (
    <LogProvider
      value={{
        logs,
        totalLogCount: totalLogs,
        fetchLogs,
        doLogNoteAction: doLogAction,
      }}
    >
      {children}
    </LogProvider>
  )
}

export default LogContextContainer

export const useLogContext = (): ILogContext => {
  return useContext(LogContext) as ILogContext
}
