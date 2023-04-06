import * as React from 'react'
import {
  Avatar,
  LabelDisplayedRowsArgs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { TableBodyStyle, TableHeaderStyle, TableText } from './Table.style'
import styles from './Table.module.scss'
import { makeStyles } from '@mui/styles'
import { TERTIARY_BLACK } from '../../../constants/color'
import { SortableHandle } from 'react-sortable-hoc'

export interface IColumn {
  id: string
  label: string
  minWidth?: number
  type?: 'text' | 'avatar'
  align?: 'right' | 'left'
  showRightBorder?: boolean
}
interface ITable {
  columns: IColumn[]
  data: any[]
  showHeader?: boolean
}

const useStyles = makeStyles({
  tableContainer: {
    padding: '0 8px',
    '& .MuiTableCell-head': {
      color: TERTIARY_BLACK,
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '16px',
      fontFamily: 'Open Sans',
      padding: '12px',
    },
    '& .MuiTableCell-body': {
      padding: '16px 12px !important',
    },
    '& .MuiTableCell-body:first-child': {
      padding: '0 !important',
    },
  },
})

const CustomTable: React.FC<ITable> = ({ columns, data, showHeader = true }): React.ReactElement => {
  const classes = useStyles()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const DragHandle = SortableHandle(() => (
    <span className={styles.dragImg}>
      <img src="/images/drag.svg" height={24} width={24} />
    </span>
  ))

  const defaultLabelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
    return `Showing ${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className={classes.tableContainer}>
      {showHeader ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Show"
          labelDisplayedRows={defaultLabelDisplayedRows}
        />
      ) : null}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <>
                  {i === 0 && <TableCell className={styles.dragCell}></TableCell>}
                  <TableCell
                    key={column.id}
                    className={column.showRightBorder ? styles.borderRight : ''}
                    align={column.align}
                    style={{ minWidth: column.minWidth, ...TableHeaderStyle }}
                  >
                    {column.label}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow style={{ borderLeft: '3px solid red' }} role="checkbox" tabIndex={-1} key={'row' + index}>
                  {columns.map((column, i) => {
                    const value = row[column.id]
                    return (
                      <>
                        {i === 0 && <TableCell className={styles.dragCell}>{<DragHandle />}</TableCell>}
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ ...TableBodyStyle }}
                          className={column.showRightBorder ? styles.borderRight : ''}
                        >
                          {column.type === 'avatar' ? (
                            <Avatar style={{ width: 40, height: 40 }}> </Avatar>
                          ) : (
                            <Typography style={{ ...TableText }}>{value}</Typography>
                          )}
                        </TableCell>
                      </>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default CustomTable
