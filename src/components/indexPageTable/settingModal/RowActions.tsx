import React, { ReactElement } from 'react'
import CustomTable from '../../../layouts/log/table/Table'
import { ActionType as ServerActionType } from '../../../graphql/types/graphql-global-types'
import { isAvailable, mapToAction } from '../IndexPageTable.helper'
import { ActionType } from '../../../constants/enums'
import { IRowAction } from '../../../graphql/types/ApiTypes'
import ToggleSwitch from '../../shared/ToggleSwitch'

interface IRowActionProps {
  rowActions: IRowAction[]
  setRowAction: (actions: IRowAction[]) => void
}
const labels = [ActionType.DUPLICATE, ActionType.DELETE, ActionType.ADD_REMOVE_TAGS, ActionType.ADD_REMOVE_PERMISSIONS]
const DISABLE_ACTION: ActionType[] = [ActionType.DUPLICATE, ActionType.DELETE]
const RowActions: React.FC<IRowActionProps> = ({ rowActions, setRowAction }): ReactElement => {
  const onRowActionChange = (action: ActionType, value: boolean, type: 'single' | 'group') => {
    const serverAction = mapToAction(action) || ServerActionType.delete
    const index = rowActions.findIndex((row) => row.action === serverAction)
    if (index >= 0) {
      const oldAction = { ...rowActions[index] }
      oldAction[type] = value
      const newActions = [...rowActions]
      newActions.splice(index, 1, {
        ...oldAction,
      })
      setRowAction([...newActions])
    }
  }
  const isDisable = (action: ActionType) => {
    return DISABLE_ACTION.includes(action)
  }
  return (
    <CustomTable
      showHeader={false}
      data={labels.map((data: ActionType) => {
        return [
          data,
          <ToggleSwitch
            key={data + '1'}
            checked={isAvailable(rowActions, data, 'single')}
            onChange={(event) => {
              onRowActionChange(data, event.target.checked, 'single')
            }}
          />,
          <ToggleSwitch
            key={data + '2'}
            disabled={isDisable(data)}
            checked={isAvailable(rowActions, data, 'group')}
            onChange={(event) => {
              onRowActionChange(data, event.target.checked, 'group')
            }}
          />,
        ]
      })}
      columns={[
        {
          id: '0',
          label: 'Action',
          minWidth: 253,
          type: 'text',
          align: 'left',
          showRightBorder: true,
        },
        {
          id: '1',
          label: 'Single row',
          minWidth: 90,
          type: 'text',
          showRightBorder: true,
        },
        {
          id: '2',
          minWidth: 90,
          label: 'Multiple rows',
          type: 'text',
          align: 'left',
        },
      ]}
    />
  )
}

export default RowActions
