import React, { useState, useEffect } from 'react'
import { arrayMoveMutable } from 'array-move'
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { TableText } from '../../layouts/log/table/Table.style'
import styles from './SortableTable.module.scss'
import { makeStyles } from '@mui/styles'
import { TERTIARY_BLACK } from '../../constants/color'
export interface IColumn {
  id: string
  label: string
  minWidth?: number
  type?: 'text' | 'avatar'
  align?: 'right' | 'left'
  showRightBorder?: boolean
}

export interface IData {
  date: string
  hour: string
  user: string
  action: string
  path: string
  setting: string
  oldValue: string
  newValue: string
  notes: string
}
interface ITable {
  columns: IColumn[]
  data: any[]
  rawData: any[]
  setData: (actions: any[]) => void
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
      padding: '8px 12px',
    },
    '& .MuiTableCell-body:last-child,& .MuiTableCell-head:last-child': {
      padding: 0,
      border: 'none',
    },
  },
})

const SortableTable: React.FC<ITable> = ({ columns, data, rawData, setData }): React.ReactElement => {
  const [items, setItems] = useState(data)
  const classes = useStyles()

  useEffect(() => {
    setItems(data)
  }, [data])

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newItems = [...items]
    const newRawData = [...rawData]
    const remIdx: number = oldIndex !== null ? oldIndex : 0
    const addIdx: number = newIndex !== null ? newIndex : 0
    arrayMoveMutable(newItems, remIdx, addIdx)
    arrayMoveMutable(newRawData, remIdx, addIdx)
    setItems([...newItems])
    setData([...newRawData])
  }

  const RowSettingsTable = () => {
    return (
      <TableContainer
        key={'tableContainer'}
        sx={{ maxHeight: 465 }}
        className={`${styles.mainTable} ${classes.tableContainer}`}
      >
        <Table key="table" stickyHeader aria-label="sticky table">
          <TableHead key="tableHead">
            <TableRow>
              {columns.map((column, i) => (
                <>
                  {i === 0 && <TableCell className={styles.dragCell}></TableCell>}
                  <TableCell
                    className={`${column.showRightBorder ? styles.borderRight : ''}`}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    // colSpan={index === columns.length - 1 ? 2 : 1}
                  >
                    {column.label}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <SortableList
            key={'sortableList'}
            useDragHandle
            items={items}
            onSortEnd={onSortEnd}
            helperClass="sortableHelper"
            distance={3}
            lockAxis="y"
            lockToContainerEdges={true}
            columns={columns}
          />
        </Table>
      </TableContainer>
    )
  }
  return <Paper key={'paper'}> {RowSettingsTable()}</Paper>
}

export default SortableTable

const DragHandle = SortableHandle(() => (
  <span className={styles.dragImg}>
    <img src="/images/drag.svg" height={24} width={24} />
  </span>
))

const SortableItem = SortableElement(({ value, index, columns }: { value: any; index: number; columns: any }) => (
  <TableRow className={styles.sortTableRow} role="checkbox" key={'row' + index} style={{ zIndex: 99999 }}>
    {columns.map((column: any, idx: number) => {
      const val = value[column.id]
      return (
        <>
          {idx === 0 && <TableCell className={styles.dragCell}>{<DragHandle />}</TableCell>}
          <TableCell
            className={[column.showRightBorder ? styles.borderRight : '', idx === 0 ? styles.firstCell : ''].join(' ')}
            key={idx}
            align={column.align}
            style={{ display: 'table-cell' }}
          >
            {column.type === 'avatar' ? (
              <Avatar style={{ width: 40, height: 40 }}> </Avatar>
            ) : (
              <span>
                <Typography key={' ' + idx} style={{ ...TableText }}>
                  {val}{' '}
                </Typography>
              </span>
            )}
          </TableCell>
        </>
      )
    })}
    {/* <TableCell key={'Dragging Point'} style={{ ...TableDraggingImg, display: 'table-cell', width: '20px' }}>
      <span key="span">
        <img style={{ zIndex: -1 }} src="/images/delete_1.svg" />
      </span>
    </TableCell> */}
  </TableRow>
))

const SortableList = SortableContainer(({ items, columns }: any) => {
  return (
    <TableBody key="tableBody">
      {items.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} columns={columns} />
      ))}
    </TableBody>
  )
})
