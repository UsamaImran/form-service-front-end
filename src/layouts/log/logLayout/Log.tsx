import styles from './Log.module.scss'
import React, { Fragment } from 'react'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import QuickSearchToolbar from '../../../components/dataGrid/quickSearxhToolbar/QuickSearchbarToolbar'
import { Avatar } from '@mui/material'
import { NotesPopover } from '../../../components/notesPopover/NotePopover'
import { excludeField, groupBy } from '../../../helpers/helpers'
import useDebounce from '../../../customHooks/useDebounce'
import { BaseDataGrid } from '../../../components/baseDataGrid/BaseDataGrid'
import { INote, ILog } from '../../../graphql/types/ApiTypes'
import { useLogContext } from '../../../context/logContainer/LogContainer'

const LOG_INDEX_TABLE: GridColDef[] = [
  {
    field: 'entityName',
    headerName: 'Name',
    width: 150,
    disableColumnMenu: true,
    cellClassName: `${styles['ml-1']} ${styles['entity-name']}`,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'date',
    headerName: 'Last Modified',
    width: 120,
    disableColumnMenu: true,
  },
  {
    field: 'hour',
    headerName: 'Hour',
    width: 80,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'user',
    headerName: 'By',
    width: 80,
    renderCell: () => <Avatar />,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'totalActions',
    headerName: 'Total Actions',
    width: 120,
    align: 'center',
    disableColumnMenu: true,
  },
  {
    field: 'action',
    headerName: 'Last Action',
    width: 160,
    sortable: false,
    disableColumnMenu: true,
    cellClassName: `${styles['text-capitalize']}`,
  },
  {
    field: 'path',
    headerName: 'Path',
    width: 300,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'oldValue',
    headerName: 'Old Value',
    width: 260,
    cellClassName: styles['two-lines'],
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'newValue',
    headerName: 'New Value',
    width: 260,
    cellClassName: styles['two-lines'],
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 160,
    cellClassName: `${styles['log-notes']} ${styles['two-lines']}`,
    renderCell: (params) => {
      const notes: INote[] | [] = params?.row?.notes ? params.row.notes : []
      notes.sort((a, b) => new Date(b.editedAt).valueOf() - new Date(a.editedAt).valueOf())
      const logID = params.row.id
      return <NotesPopover notes={notes} logId={logID} />
    },
  },
]

const ENTITY_LOG_TABLE: GridColDef[] = [
  {
    field: 'entityName',
    headerName: 'Name',
    width: 150,
    disableColumnMenu: true,
    cellClassName: `${styles['ml-1']} ${styles['entity-name']}`,
    hide: true,
  },
  {
    field: 'department',
    headerName: 'Department',
    width: 150,
    disableColumnMenu: true,
    hide: true,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 120,
    cellClassName: `${styles['ml-1']}`,
  },
  {
    field: 'hour',
    headerName: 'Hour',
    width: 80,
  },
  {
    field: 'user',
    headerName: 'User',
    width: 80,
    renderCell: () => <Avatar />,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 130,
  },
  {
    field: 'path',
    headerName: 'Path',
    width: 200,
  },
  {
    field: 'oldValue',
    headerName: 'Old Value',
    width: 200,
    cellClassName: styles['two-lines'],
  },
  {
    field: 'newValue',
    headerName: 'New Value',
    width: 200,
    cellClassName: styles['two-lines'],
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 160,
    cellClassName: `${styles['log-notes']} ${styles['two-lines']}`,
    renderCell: (params) => {
      const notes: INote[] | [] = params?.row?.notes ? params.row.notes : []
      notes.sort((a, b) => new Date(b.editedAt).valueOf() - new Date(a.editedAt).valueOf())
      const logID = params.row.id
      return <NotesPopover notes={notes} logId={logID} />
    },
  },
]

const Log: React.FC = (): React.ReactElement => {
  const { logs, fetchLogs, totalLogCount } = useLogContext()
  // const [fetchedLogs, setFetchedLogs] = React.useState<ILog[]>([])
  const [logToShow, setLogToShow] = React.useState<ILog[]>([])
  const [filteredLogs, setFilteredLogs] = React.useState<ILog[]>([])
  const [logSearch, setLogSearch] = React.useState('')
  const debouncedValue = useDebounce<string>(logSearch, 200)
  // const [logsCount, setLogsCount] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(25)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [currentPageForLogs, setCurrentPageForLogs] = React.useState(0)
  const [groupedLogs, setGroupedLogs] = React.useState<any>(null)
  const [selectedEntityId, setSelectedEntityId] = React.useState<string | null>(null)
  const [entityFileLogs, setEntityFileLogs] = React.useState<ILog[]>([])
  const [isEntityLogs, setIsEntityLogs] = React.useState(false)
  // const [IsRender, setIsRender] = React.useState<boolean>(false)

  React.useEffect(() => {
    fetchServerLogs(currentPage)
  }, [])

  React.useEffect(() => {
    const cleanedLogs: ILog[] = getCleanedData(logs)
    const logToShow = getLogToShow([...cleanedLogs])
    setLogToShow([...logToShow])
  }, [logs])

  React.useEffect(() => {
    if (selectedEntityId) {
      setEntityFileLogs(groupedLogs[selectedEntityId])
    }
  }, [groupedLogs])
  React.useEffect(() => {
    getFilteredLogs()
  }, [debouncedValue])

  const getUserLogForEachEntity = (entityId: string, grouped: any) => {
    const logsPerEntity = grouped[entityId]
    return {
      ...logsPerEntity[logsPerEntity.length - 1],
      totalActions: logsPerEntity.length,
    }
  }

  const fetchServerLogs = (cPage: number) => {
    try {
      fetchLogs(cPage)
      // const { Logs, totalLogs } = await NetworkService.FetchLogs({ limit: 100, offset: currentPage })
      // const cleanedLogs: ILog[] = getCleanedData(Logs)
      // console.log([...fetchedLogs, ...cleanedLogs])
      // const collectedLogs = [...fetchedLogs, ...cleanedLogs]
      // setFetchedLogs([...collectedLogs])
      // setLogsCount(totalLogs)
      // const logToShow = getLogToShow([...collectedLogs])
      // setLogToShow([...logToShow])
    } catch (err) {
      console.log(err, 'error while fetching logs')
    }
  }

  const getLogToShow = (logs: ILog[]) => {
    const groupLogs: any = groupBy('entityId', logs)
    setGroupedLogs(groupLogs)
    const entityIds = Object.keys(groupLogs)
    let logToShow: any = []
    entityIds.forEach((entityId) => {
      const userLogs = getUserLogForEachEntity(entityId, groupLogs)
      logToShow = [...logToShow, userLogs]
    })
    return logToShow
  }

  const getCleanedData = (logs: ILog[]) => {
    return logs.map((log: ILog) => {
      const newLog = excludeField(log, '__typename')
      return { ...newLog, notes: newLog.notes.map((note: INote) => excludeField(note, '__typename')) }
    })
  }

  const getFilteredLogs = () => {
    const text: string = debouncedValue.toLowerCase()
    const logToBeFilter = isEntityLogs ? entityFileLogs : logToShow
    const filtered: ILog[] = logToBeFilter.filter(
      (log: ILog) =>
        log.date?.toLowerCase().includes(text) ||
        log.hour?.toLowerCase().includes(text) ||
        log.action?.toLowerCase().includes(text) ||
        log.path?.toLowerCase().includes(text) ||
        log.oldValue?.toLowerCase().includes(text) ||
        log.newValue?.toLowerCase().includes(text) ||
        log?.notes?.some((note: INote) => {
          return note.note.toLowerCase().includes(text)
        }),
    )

    setFilteredLogs([...filtered])
  }

  const handlePageSize = (size: number) => {
    setPageSize(size)
  }

  const handleCurrentPageChange = (cPage: number) => {
    setCurrentPage(cPage)
    if (cPage > currentPage && logToShow.length < totalLogCount) {
      fetchServerLogs(cPage)
    }
  }

  const onCellClick = (params: GridCellParams) => {
    const { field, row } = params
    const { entityId } = row
    if (field === 'entityName' && groupedLogs && groupedLogs[entityId]) {
      // setCurrentPage(0)
      setLogSearch('')
      setSelectedEntityId(entityId)
      setEntityFileLogs(groupedLogs[entityId])
      setIsEntityLogs(!isEntityLogs)
    }
  }

  return (
    <Fragment>
      <div className="indexHeadingContainer mt-3">
        <p className="indexHeading">{isEntityLogs ? `${entityFileLogs[0]?.entityName} Index Log` : 'Index Log'}</p>
        {isEntityLogs ? (
          <span
            className={styles['back-button']}
            onClick={() => {
              setSelectedEntityId(null)
              setIsEntityLogs(false)
              setCurrentPageForLogs(0)
              setLogSearch('')
            }}
          >
            {'< Back'}
          </span>
        ) : null}
      </div>
      <div className={styles['parent-container']}>
        {/* <QuickSearchToolbar
          value={logSearch}
          placeholder={'Search log'}
          clearSearch={() => setLogSearch('')}
          onChange={(e) => setLogSearch(e.target.value)}
          showModalIcons={false}
          handleModal={(action: string) => {
            console.log(action)
          }}
        /> */}
        <div className={styles['container']}>
          {!isEntityLogs ? (
            <BaseDataGrid
              id={`${1}-${currentPage}`}
              rows={debouncedValue.length > 0 ? [...filteredLogs] : [...logToShow]}
              columns={LOG_INDEX_TABLE}
              rowCount={debouncedValue.length > 0 ? filteredLogs.length : totalLogCount}
              pageSize={pageSize}
              page={currentPage}
              handleCurrentPageChange={handleCurrentPageChange}
              handlePageSize={handlePageSize}
              onCellClick={onCellClick}
            />
          ) : (
            <BaseDataGrid
              id={`${2}-${currentPageForLogs}`}
              rows={debouncedValue.length > 0 ? [...filteredLogs] : [...entityFileLogs]}
              columns={ENTITY_LOG_TABLE}
              rowCount={debouncedValue.length > 0 ? filteredLogs.length : entityFileLogs.length}
              pageSize={pageSize}
              page={currentPageForLogs}
              handleCurrentPageChange={(page) => {
                setCurrentPageForLogs(page)
              }}
              handlePageSize={handlePageSize}
              // onCellClick={onCellClick}
            />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Log
