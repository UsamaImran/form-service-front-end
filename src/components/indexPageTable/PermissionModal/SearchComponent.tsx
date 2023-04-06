import React, { useState, useEffect } from 'react'
import styles from './PermissionModal.module.scss'
import { Autocomplete } from '@mui/material'
import { Add } from '@mui/icons-material'
import { IUser } from '../../../graphql/types/ApiTypes'
import Button from '../../shared/Button'
import TextInputField from '../../shared/TextInputField'
import { makeStyles } from '@mui/styles'

interface IPermissionSearchComponent {
  onAddClick: (users: string[]) => void
  users: IUser[]
}

const useStyles = makeStyles({
  textfieldType: {
    marginRight: '16px',
    '& .MuiOutlinedInput-root': {
      padding: '6px 39px 6px 8px !important',
    },
  },
})

const SearchComponent: React.FC<IPermissionSearchComponent> = ({ users, onAddClick }) => {
  const [selectedUsers, addUserToSelection] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [resetAutoComplete, triggerResetAutoComplete] = useState(1)
  const classes = useStyles()

  useEffect(() => {
    const userIds = users?.map((user) => user._id)
    setOptions([...userIds])
  }, [users])

  const getUsernameById = (id: string) => {
    const username = users?.find((user) => user._id === id)?.username
    return username || ''
  }
  return (
    <div className={styles.permissionTypes} style={{ display: 'flex' }}>
      <Autocomplete
        limitTags={3}
        filterSelectedOptions
        key={resetAutoComplete}
        style={{ width: '84%' }}
        multiple
        id="size-small-outlined"
        size="medium"
        options={[...options]}
        getOptionLabel={(id) => getUsernameById(id)}
        className={classes.textfieldType}
        renderInput={(params) => (
          <TextInputField variant={'outlined'} {...params} placeholder="Type names or groups to edit permissions" />
        )}
        onChange={(_, newValue) => {
          addUserToSelection([...newValue])
        }}
      />
      <Button
        className={styles.addPermission}
        onClick={() => {
          triggerResetAutoComplete(resetAutoComplete + 1)
          onAddClick(selectedUsers)
        }}
      >
        <Add /> Add
      </Button>
    </div>
  )
}

export default SearchComponent
