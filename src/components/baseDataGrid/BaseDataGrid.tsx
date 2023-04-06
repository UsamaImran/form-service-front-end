import React, { useEffect, useState } from 'react'
import { DataGrid, GridCellParams, GridColDef, GridSelectionModel, MuiEvent } from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles'
import styles from './BaseDataGrid.module.scss'
import { Box } from '@mui/material'
import CustomPagination from '../pagination/Pagination'
import QuickSearchToolbar from '../dataGrid/quickSearxhToolbar/QuickSearchbarToolbar'

interface BaseDataGridProps {
  id: string
  columns: GridColDef[]
  rows: readonly {
    [key: string]: any
  }[]
  headerClassName?: string
  rowCount: number
  pageSize: number
  page: number
  showPagination?: boolean
  handlePageSize: (size: number) => void
  handleCurrentPageChange: (currentPage: number) => void
  onCellClick?: (params: GridCellParams, event: MuiEvent<React.MouseEvent>) => void
  showToolbar?: boolean
  handleRowEdit?: any
}

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-main': {
      overflow: 'unset',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '& .MuiTablePagination-root': {
      marginTop: '-60px',
      marginRight: '0px',
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

export const BaseDataGrid: React.FunctionComponent<BaseDataGridProps> = ({
  id,
  columns,
  rows,
  headerClassName = styles['columns-header'],
  rowCount,
  pageSize,
  page,
  handlePageSize,
  handleCurrentPageChange,
  onCellClick,
  showPagination = true,
  showToolbar = true,
  handleRowEdit = () => {},
}) => {
  const classes = useStyles()
  const [updatedColumns, setUpdatedColumns] = useState<GridColDef[]>(columns)
  const [searchText, setSearchText] = React.useState('')
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
  const requestSearch = (searchValue: string) => setSearchText(searchValue)
  // const [pageSize, setPageSize] = React.useState(25)

  useEffect(() => {
    setUpdatedColumns(columns.map((col) => ({ ...col, headerClassName })))
  }, [columns])
  const handleActionClick = () => {}
  return (
    <Box>
      {showToolbar && (
        <QuickSearchToolbar
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            requestSearch(event.target.value)
          }
          clearSearch={() => requestSearch('')}
          handleModal={handleActionClick}
          showMenu={false}
        />
      )}

      <DataGrid
        key={id}
        components={{
          Pagination: showPagination ? CustomPagination : undefined,
        }}
        hideFooterPagination={!showPagination}
        onCellClick={onCellClick}
        className={['data-grid-column', 'custom-row', classes.root].join(' ')}
        columns={updatedColumns}
        rows={[...rows]}
        pageSize={pageSize}
        page={page}
        // rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize) => handlePageSize(newPageSize)}
        onPageChange={(page) => handleCurrentPageChange(page)}
        rowCount={rowCount}
        disableSelectionOnClick={true}
        sx={{
          border: 'none',
        }}
        componentsProps={{
          pagination: {
            className: '',
            options: [5, 10, 15, 20, 25, 50, 100],
          },
        }}
        onEditRowsModelChange={handleRowEdit}
      />
    </Box>
  )
}
