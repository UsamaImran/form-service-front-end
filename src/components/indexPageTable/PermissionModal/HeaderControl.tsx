import React from 'react'
import styles from './PermissionModal.module.scss'
import { SelectChangeEvent } from '@mui/material'
import DropdownPopover from '../../dropdown/DropdownPopover'
import { ICustomForm } from '../../../layouts/indexSetting/PermissionModal/PermissionModal'
import Typography from '../../shared/Typography'
import ToggleSwitch from '../../shared/ToggleSwitch'

export interface IPermissionControls {
  canDuplicate: boolean
  canView: boolean
}

interface IPermissionHeaderControl {
  onValueChange: (controls: any) => void
  forms: any
}

const HeaderControl: React.FC<IPermissionHeaderControl> = ({ forms, onValueChange }) => {
  const hasVaries = (property: 'canDuplicate' | 'canView') => {
    const duplication = new Set()
    forms.forEach((form: any) => {
      duplication.add(form[property])
    })
    return duplication.size > 1
  }
  const onDuplicateValueChanged = (event: SelectChangeEvent<unknown>, property: 'canDuplicate' | 'canView') => {
    const value = event.target.value === 'yes' ? true : false
    const newState: any = {}
    newState[property] = value
    onValueChange({ ...newState })
  }

  return (
    <div>
      <div className={styles.heading}>
        <Typography variant="body1"> Can be duplicated</Typography>
        {!hasVaries('canDuplicate') ? (
          <ToggleSwitch
            checked={forms[0]?.canDuplicate || false}
            onChange={(event) => {
              onValueChange({ canDuplicate: event.target.checked })
            }}
          ></ToggleSwitch>
        ) : (
          <DropdownPopover
            disableOptions={['varies']}
            options={getOptions()}
            value="varies"
            onChange={(event) => {
              onDuplicateValueChanged(event, 'canDuplicate')
            }}
          ></DropdownPopover>
        )}
      </div>
      <div className={`${styles.heading} mt-3`}>
        <Typography variant="body1">Everyone can view</Typography>
        {!hasVaries('canView') ? (
          <ToggleSwitch
            checked={forms[0]?.canView || false}
            onChange={(event) => {
              onValueChange({ canView: event.target.checked })
            }}
          ></ToggleSwitch>
        ) : (
          <DropdownPopover
            disableOptions={['varies']}
            options={getOptions()}
            value="varies"
            onChange={(event) => {
              onDuplicateValueChanged(event, 'canView')
            }}
          ></DropdownPopover>
        )}
      </div>
    </div>
  )
}

export default HeaderControl

const getOptions = () => {
  return [
    { key: 'yes', value: 'Yes' },
    { key: 'no', value: 'No' },
    { key: 'varies', value: 'Varies' },
  ]
}
