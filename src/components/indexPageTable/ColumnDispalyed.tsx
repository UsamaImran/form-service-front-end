import React, { ReactElement, useEffect, useState } from 'react'
import { GridEnrichedColDef as SelectedValueTypes } from '@mui/x-data-grid'
import ConfirmationPopup from '../../layouts/popup/ConfirmationPopup'
import { arrayMoveMutable } from 'array-move'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import IndexPageStyle from './IndexPageStyle.module.scss'
import { makeStyles } from '@mui/styles'
import Button from '../shared/Button'
import ToggleSwitch from '../shared/ToggleSwitch'

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-elevation24': {
      height: '600px',
    },
  },
})

interface IColumnDisplayedModal {
  visibleColumns: Array<SelectedValueTypes>
  showModal: (args: boolean) => void
  onSave: (columns: Array<SelectedValueTypes>) => void
}

const ColumnDisplayedModal: React.FC<IColumnDisplayedModal> = ({ visibleColumns, showModal, onSave }): ReactElement => {
  const classes = useStyles()
  const [columns, setColumns] = useState([...visibleColumns])
  useEffect(() => {
    setColumns([...visibleColumns])
  }, [])

  const updateHandlerValue = (index: number, value: any, property: string) => {
    const rows = [...columns]
    const row = { ...rows[index] } as any
    row[property] = value
    rows.splice(index, 1, row)
    setColumns([...rows])
  }

  const onSwitchToggle = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = !event.target.checked
    updateHandlerValue(index, value, 'hide')
  }

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newItems = [...columns]
    const remIdx: number = oldIndex !== null ? oldIndex : 0
    const addIdx: number = newIndex !== null ? newIndex : 0
    arrayMoveMutable(newItems, remIdx, addIdx)
    setColumns([...newItems])
    // setItems([...newItems])
    // setData([...newRawData])
  }
  const [hoveSlotIndex, setHoverSlotIndex] = useState<number>(-1)

  const bodyElement = () => {
    return columns.map((column, index) => {
      return (
        <div
          key={index}
          className={IndexPageStyle['slot']}
          onMouseEnter={() => {
            setHoverSlotIndex(index)
          }}
          onMouseLeave={() => {
            setHoverSlotIndex(-1)
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ opacity: index === hoveSlotIndex ? 1 : 0 }}>
              <DragHandle />
            </div>
            <span>{column.headerName}</span>
          </div>
          <ToggleSwitch
            checked={!column.hide}
            onChange={(event) => {
              onSwitchToggle(event, index)
            }}
          />
        </div>
      )
    })
  }
  const rendererBody = () => {
    return (
      <SortableList
        key={'sortableList'}
        useDragHandle
        items={bodyElement()}
        onSortEnd={onSortEnd}
        helperClass="sortableHelper"
        distance={3}
        lockAxis="y"
        lockToContainerEdges={true}
      />
    )
  }
  return (
    <ConfirmationPopup
      header="Column Displayed"
      className={[classes.root].join(' ')}
      titleClassName="ml-2"
      maxWidth="xs"
      body={rendererBody()}
    >
      <Button
        variant="contained"
        onClick={() => {
          onSave(columns)
          showModal(false)
        }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          showModal(false)
        }}
      >
        Back
      </Button>
    </ConfirmationPopup>
  )
}
export default ColumnDisplayedModal

const DragHandle = SortableHandle(() => (
  <span className={`${IndexPageStyle['dragImg']}`}>
    <img src="/images/drag.svg" height={24} width={24} />
  </span>
))

const SortableItem = SortableElement(({ value, index }: { value: any; index: number }) => (
  <div className={IndexPageStyle['column--display__container']} key={index}>
    {value}
  </div>
))

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <div key={'fragment'}>
      {items.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  )
})
