import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridEnrichedColDef as ColumnValueTypes, GridSelectionModel } from '@mui/x-data-grid'
import DataGridSelectedHeader from './customDataGridHeader/DataGridSelectedHeader'
import { escapeSearchRegex } from '../../helpers/helpers'
import QuickSearchToolbar from './quickSearxhToolbar/QuickSearchbarToolbar'
import { makeStyles } from '@mui/styles'
import { ActionType } from '../../constants/enums'
import { isAvailable } from '../indexPageTable/IndexPageTable.helper'
import { IIndexSetting, IRowAction } from '../../graphql/types/ApiTypes'
import CustomPagination from '../pagination/Pagination'

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-main': {
      overflow: 'unset',
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '& .MuiTablePagination-root': {
      marginTop: '-60px',
      marginRight: '195px',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '12px',
      lineHeight: '16px',
    },
    '& .MuiInputBase-root': {
      border: '1px solid #BFBFBF',
      borderRadius: '4px',
    },
    '& .MuiButtonBase-root:disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
    },
    '& .MuiButtonBase-root': {
      color: '#0099cc',
    },
    '& .MuiDataGrid-cell': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#333333',
    },
    '& .MuiDataGrid-footerContainer': {
      minHeight: '0px',
    },
  },
})
export interface IDataProps {
  id: string
  name?: string
  menu?: string
  sub_menu?: string
  last_edited?: string
  avatar?: JSX.Element
  tags?: string[]
}

interface IQuickFilteringGridProps {
  reset: number | string
  rows: Array<IDataProps>
  columns: Array<ColumnValueTypes>
  className: string
  handleActionClick: (action: string) => void
  handleSelectionModel: (formsList: GridSelectionModel) => void
  dataGridClassName?: string
  indexSettings: IIndexSetting | undefined
}

const CustomDataGrid: React.FC<IQuickFilteringGridProps> = ({
  reset,
  rows,
  columns,
  className,
  handleActionClick,
  handleSelectionModel,
  dataGridClassName = '',
  indexSettings,
}) => {
  const classes = useStyles()

  const [searchText, setSearchText] = React.useState('')
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
  const requestSearch = (searchValue: string) => setSearchText(searchValue)
  const [pageSize, setPageSize] = React.useState(25)

  const filteredRowData = (() => {
    const searchRegex = new RegExp(escapeSearchRegex(searchText), 'i')
    const filteredRows = rows.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString())
      })
    })
    return filteredRows
  })()

  const [headerActions, setHeaderActions] = useState<any>([])
  useEffect(() => {
    setSelectionModel([])
    handleSelectionModel([])
  }, [reset])

  useEffect(() => {
    const actions = getHeaderAction()
    setHeaderActions([...actions])
  }, [selectionModel.length])

  const getHeaderAction = () => {
    const headerAction = [
      {
        onClick: () => handleActionClick(ActionType.ADD_REMOVE_TAGS),
        label: ActionType.ADD_REMOVE_TAGS,
        icon: '/images/tag.svg',
      },
      {
        onClick: () => handleActionClick(ActionType.ADD_REMOVE_PERMISSIONS),
        label: ActionType.ADD_REMOVE_PERMISSIONS,
        icon: '/images/key_black.svg',
      },
      {
        onClick: () => handleActionClick(ActionType.EDIT),
        label: ActionType.EDIT,
        icon: '/images/content_copy_black.svg',
      },
      {
        onClick: () => handleActionClick(ActionType.DUPLICATE),
        label: ActionType.DUPLICATE,
        icon: '/images/settings.svg',
      },
      {
        onClick: () => handleActionClick(ActionType.DELETE),
        label: ActionType.DELETE,
        icon: '/images/delete_black.svg',
      },
    ]
    const mode = selectionModel.length === 1 ? 'single' : 'group'
    let actionToShow = selectionModel.length === 1 ? [...headerAction] : [...headerAction.slice(0, 2)]
    actionToShow = actionToShow.filter((action) => {
      return isActionAvailable(action.label, mode)
    })
    return actionToShow
  }

  const isActionAvailable = (action: ActionType, mode: 'single' | 'group' = 'single') => {
    if (indexSettings) {
      const rowActions = indexSettings.rowAction as IRowAction[]
      return isAvailable(rowActions, action, mode)
    }
    return false
  }

  return (
    <Box
      sx={{
        '& .indexHeader': {
          color: '#8C8C8C',
        },
      }}
    >
      {selectionModel.length ? (
        <DataGridSelectedHeader selectionModel={selectionModel} headerAction={headerActions} />
      ) : (
        <QuickSearchToolbar
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            requestSearch(event.target.value)
          }
          clearSearch={() => requestSearch('')}
          handleModal={handleActionClick}
        />
      )}
      <DataGrid
        className={['data-grid-column', dataGridClassName, classes.root].join(' ')}
        components={{
          Pagination: CustomPagination,
        }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
        // rowsPerPageOptions={[25, 50, 100]}
        rows={filteredRowData}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel)
          handleSelectionModel(newSelectionModel)
        }}
        componentsProps={{
          pagination: {
            className: '',
            options: [5, 10, 15, 20, 25, 50, 100],
          },
        }}
        selectionModel={selectionModel}
        getRowClassName={() => className}
        pagination
      />
    </Box>
  )
}

export default CustomDataGrid
