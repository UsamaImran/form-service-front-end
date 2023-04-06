import React from 'react'
import styles from './PermissionModal.module.scss'
import { Avatar } from '@mui/material'
import DropdownPopover from '../../dropdown/DropdownPopover'
import { IUserPermission } from '../../../layouts/indexSetting/PermissionModal/PermissionModal'

interface IUserPermissionArray {
  onValueChange: (user: IUserPermission) => void
  users: IUserPermission[]
}

const UserPermissionSlot: React.FC<IUserPermissionArray> = ({ onValueChange, users }) => {
  const getUser = () => {
    return users[0].user
  }
  const hasVaries = () => {
    const duplication = new Set()
    users.forEach((user) => {
      duplication.add(user.access)
    })
    return duplication.size > 1
  }

  const userPermission = () => {
    return users[0].access
  }

  const isOwner = () => {
    return userPermission() === 'owner'
  }

  return (
    <div className={styles.userSlot}>
      <div className={styles.userAvtar}>
        <Avatar src={getUser()?.avatar} style={{ width: 40, height: 40 }} />
        <span className="ml-2">{getUser()?.username}</span>
      </div>
      <DropdownPopover
        disabled={isOwner()}
        disableOptions={['owner', 'varies']}
        options={getOptions()}
        value={hasVaries() ? 'varies' : userPermission()}
        onChange={(event) => {
          const user = users[0]
          onValueChange({
            ...user,
            access: event.target.value as string,
          })
        }}
      ></DropdownPopover>
    </div>
  )
}

export default UserPermissionSlot

const getOptions = () => {
  return [
    { key: 'owner', value: 'Owner' },
    { key: 'view', value: 'Can View' },
    { key: 'edit', value: 'Can Edit' },
    { key: 'varies', value: 'Varies' },
  ]
}
