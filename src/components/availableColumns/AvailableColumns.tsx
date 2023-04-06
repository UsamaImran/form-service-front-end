import React, { ReactElement } from 'react'
import Add from '@mui/icons-material/Add'
import { IconButton, OutlinedInput, SelectChangeEvent } from '@mui/material'
import Dropdown from '../dropdown/Dropdown'
import { FormListColumns } from '../../constants/constants'
import SortableTable from '../sortableTable/SortableTable'
import { IIndexColumn } from '../../graphql/types/ApiTypes'
import { makeStyles } from '@mui/styles'
import Button from '../shared/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import ToggleSwitch from '../shared/ToggleSwitch'

// const AvailableColumns: React.FC = (): ReactElement => {
//   const optionsForMaxWidth: Array<string> = ['Auto', 'Manual']
//   const [rowData, updateRowData] = useState<Array<Array<string[] | string>>>([
//     [optionsForMaxWidth, 'John Cena DN'],
//     [optionsForMaxWidth, 'John'],
//     [optionsForMaxWidth, '1'],
//     [optionsForMaxWidth, '2'],
//   ])
//   const increaseNumberOfColumn = () => {
//     updateRowData([...rowData, rowData[0]])
//   }

// const defaultColumns = [
//   {
//     hidden: false,
//     label: 'Name',
//     name: '',
//     maxWidth: 'Auto',
//   },
//   {
//     hidden: false,
//     label: 'Menu',
//     name: '',
//     maxWidth: 'Auto',
//   },
//   {
//     hidden: false,
//     label: 'Sub Menu',
//     name: '',
//     maxWidth: 'Auto',
//   },
//   {
//     hidden: false,
//     label: 'Last Edited',
//     name: '',
//     maxWidth: 'Auto',
//   },
//   {
//     hidden: false,
//     label: 'Edited By',
//     name: '',
//     maxWidth: 'Auto',
//   },
//   {
//     hidden: false,
//     label: 'Tags',
//     name: '',
//     maxWidth: 'Auto',
//   },
// ]

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    '& .MuiTableContainer-root': {
      height: '100%',
    },
    '& .MuiPaper-root': {
      boxShadow: '0 0 0 0',
    },
  },
})

const maxWidthOptions: string[] = ['auto', '150', '160', '180', '200', '220', '250', '280']

interface IAvailableColumns {
  columns: IIndexColumn[]
  setColumns: (actions: IIndexColumn[]) => void
}
const AvailableColumns: React.FC<IAvailableColumns> = ({ columns = [], setColumns }): ReactElement => {
  // const [rowData, updateRowData] = useState<IIndexColumn[]>([...columns])

  const classes = useStyles()
  const increaseNumberOfColumn = () => {
    const remainingRows = defaultLabelOptions()
    const newRow = {
      defaultLabel: remainingRows[0],
      label: remainingRows[0],
      name: remainingRows[0],
      hidden: false,
      maxWidth: '150',
    } as IIndexColumn
    setColumns([...columns, newRow])
  }

  const updateHandlerValue = (index: number, value: any, property: string) => {
    const rows = [...columns]
    const row = { ...rows[index] } as any
    row[property] = value
    rows.splice(index, 1, row)
    setColumns(rows)
  }

  const onColumnChange = (event: SelectChangeEvent<unknown>, index: number) => {
    const value = event.target.value as string
    const hasValue = columns.some((column) => column.defaultLabel === value)
    if (!hasValue) updateHandlerValue(index, value, 'defaultLabel')
  }

  const onMaxWidthChange = (event: SelectChangeEvent<unknown>, index: number) => {
    const value = event.target.value as string
    updateHandlerValue(index, value, 'maxWidth')
  }

  const onSwitchToggle = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = !event.target.checked
    updateHandlerValue(index, value, 'hidden')
  }

  const onDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = event.target.value
    updateHandlerValue(index, value, 'label')
  }

  const onRemoveButtonClicked = (index: number) => {
    const rows = [...columns]
    rows.splice(index, 1)
    setColumns(rows)
  }
  const defaultLabelOptions = () => {
    const labels: string[] = columns.map((column) => column.defaultLabel)
    return FormListColumns.filter((value: string) => !labels.includes(value))
  }
  const { contentRows } = React.useMemo(() => {
    return {
      contentRows: columns.map((row, index) => {
        return [
          <Dropdown
            SelectDisplayProps={{ style: { padding: '13px 10px' } }}
            style={{ padding: 0, marginTop: '2px' }}
            options={defaultLabelOptions()}
            key={'Column' + index}
            value={row.defaultLabel}
            onChange={(event) => {
              onColumnChange(event, index)
            }}
          />,
          <ToggleSwitch
            key={'switch' + index}
            defaultChecked={!row.hidden}
            onChange={(event) => {
              onSwitchToggle(event, index)
            }}
          />,
          <Dropdown
            SelectDisplayProps={{ style: { padding: '13px 10px' } }}
            style={{ padding: 0, marginTop: '2px' }}
            options={maxWidthOptions}
            key={'ads' + index}
            value={row.maxWidth}
            onChange={(event) => {
              onMaxWidthChange(event, index)
            }}
          />,
          <OutlinedInput
            key={'input' + index}
            // value={row.label}
            defaultValue={row.label}
            inputProps={{ style: { padding: '13px 10px' } }}
            style={{ padding: 0, margin: '0px' }}
            placeholder="Displayed Name"
            onChange={(event) => {
              // setState(!state)
              onDisplayNameChange(event, index)
            }}
          />,
          <IconButton
            aria-label="delete"
            key={'delete' + index}
            onClick={() => {
              onRemoveButtonClicked(index)
            }}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>,
        ]
      }),
    }
  }, [columns])
  return (
    <div className={[classes.root].join(' ')}>
      <div>
        <Button
          disabled={columns.length === FormListColumns.length}
          onClick={increaseNumberOfColumn}
          variant="text"
          color={'primary'}
          startIcon={<Add></Add>}
        >
          Add column
        </Button>
      </div>
      <SortableTable
        key={1}
        data={contentRows}
        rawData={columns}
        setData={setColumns}
        columns={[
          {
            id: '0',
            label: 'Column',
            minWidth: 180,
            type: 'text',
            align: 'left',
          },
          {
            id: '1',
            label: 'Displayed',
            minWidth: 52,
            type: 'text',
            align: 'left',
            showRightBorder: true,
          },
          {
            id: '2',
            label: 'Max Width',
            minWidth: 107,
            type: 'text',
            align: 'left',
            showRightBorder: true,
          },
          {
            id: '3',
            label: 'Displayed Name',
            minWidth: 180,
            type: 'text',
            align: 'left',
            showRightBorder: true,
          },
          {
            id: '4',
            label: '',
            minWidth: 20,
            type: 'text',
            align: 'left',
            showRightBorder: false,
          },
        ]}
      />
    </div>
  )
}

export default AvailableColumns
