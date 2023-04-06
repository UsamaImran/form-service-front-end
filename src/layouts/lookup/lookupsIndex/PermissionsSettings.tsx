import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { updateLookup } from 'service/Lookup.services'
import HeaderControl from '../../../components/indexPageTable/PermissionModal/HeaderControl'
import SearchComponent from '../../../components/indexPageTable/PermissionModal/SearchComponent'
import UserPermissionSlot from '../../../components/indexPageTable/PermissionModal/UserPermissionSlot'
import { useCompanyContext } from '../../../context/companyContext/CompanyContainer'
import { useLookupContext } from '../../../context/lookupContext/LookupContainer'
import { ILookup, IUser } from '../../../graphql/types/ApiTypes'
import { groupBy } from '../../../helpers/helpers'
import { IUserPermission } from '../../indexSetting/PermissionModal/PermissionModal'
import styles from '../LookupIndex.module.scss'
import { ILookupSettingModal } from './LookupSettingsModal'

const PermissionsSettings: React.FC<ILookupSettingModal> = ({ handleClose }) => {
  const { users } = useCompanyContext()
  const { lookups, getLookupById, updateLookups, getLookupIndexById } = useLookupContext()
  const [currentLookup, setCurrentLookup] = React.useState<ILookup | undefined>(undefined)
  const [searchableUsers, setSearchableUsers] = React.useState<IUser[]>([])
  const [updatedLookup, setUpdatedLookup] = React.useState<any>([])
  const [groupByUser, setGroupByUser] = React.useState<any>({})
  const router = useRouter()

  React.useEffect(() => {
    setUpdatedLookup(getTransformedLookups())
    getCurrentLookup()
  }, [lookups, router])

  React.useEffect(() => {
    if (currentLookup) {
      const lookupUsers = getAllLookupsUsers()
      const nonLookupUsers = getNonLookupUsers(lookupUsers)
      const groupByUser = groupBy('id', lookupUsers)
      setGroupByUser(groupByUser)
      setSearchableUsers([...nonLookupUsers])
    }
  }, [currentLookup, updatedLookup])

  const getCurrentLookup = () => {
    const params = router.query.id as string
    const current = getLookupById(params) as ILookup
    setCurrentLookup({ ...current })
  }

  const getNonLookupUsers = (formUsers: any) => {
    const formUserIds = formUsers.map((formUser: any) => formUser.user?._id)
    return users.filter((user) => {
      return !formUserIds.includes(user._id)
    })
  }

  const getAllLookupsUsers = () => {
    let formUsers: IUserPermission[] = []

    updatedLookup &&
      updatedLookup.forEach((lookup: any) => {
        formUsers = [...formUsers, ...lookup.permission]
      })

    return formUsers.map((user) => {
      return {
        ...user,
        id: user.user?._id,
      }
    })
  }

  const getTransformedLookups = () => {
    const transformed = lookups.map((lookup) => ({
      canDuplicate: lookup.canDuplicate,
      canView: lookup.canView,
      id: lookup.id,
      permission: lookup.permission.map((per) => {
        return {
          access: per?.access,
          user: per?.user,
        }
      }),
    }))

    return transformed
  }

  const onControlChange = (control: any) => {
    const index = getLookupIndexById(currentLookup?.id as string)
    const temp = [{ ...currentLookup }] as ILookup[]
    const updatelookup = temp.map((form) => {
      return {
        ...form,
        ...control,
      }
    })

    setCurrentLookup(updatelookup[0])
    updateLookups((prevState: ILookup[]) => {
      const prev = [...prevState]
      return prev.map((item, i: number) => {
        return index === i ? { ...item, ...control } : { ...item }
      })
    })
  }

  const savePermissions = () => {
    try {
      const index = getLookupIndexById(currentLookup?.id as string)

      if (index !== -1) {
        updateLookups((prev) => {
          const prevState = [...prev]
          prevState[index].permission = updatedLookup[index].permission
          updatePermissions(prevState[index].id, prevState[index])
          return prevState
        })
      }
    } catch (err) {
      console.log('error while updating lookup permissions', err)
    }
    handleClose(false)
  }

  const updatePermissions = async (id: string, lookup: ILookup) => {
    const { permission } = lookup
    const mappedPermission = permission.map((per) => ({ access: per.access, user: per.user._id }))
    await updateLookup({ input: { id, permission: mappedPermission } })
  }

  const onUserPermissionChanged = (user: any) => {
    const localLookups = [...updatedLookup]

    localLookups.map((lookup) => {
      const permission = [...lookup.permission]
      const updatedPermissions = permission.map((perm) => {
        if (perm.user?._id === user.id) {
          return {
            ...perm,
            access: user.access,
          }
        } else {
          return perm
        }
      })
      lookup.permission = updatedPermissions
    })

    setUpdatedLookup([...localLookups])
  }

  const onAddButtonClick = (userIds: string[]) => {
    const localLookups = [...updatedLookup]
    userIds.forEach((id) => {
      const userIndex = users.findIndex((user) => user._id === id)
      localLookups.forEach((lookup) => {
        lookup.permission.push({
          access: 'view',
          user: users[userIndex],
        })
      })
    })

    setUpdatedLookup([...localLookups])
  }

  const buttons = () => {
    return (
      <div className={styles.buttonContainer}>
        <Button variant="contained" className={styles.save} onClick={() => savePermissions()}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div>
      <HeaderControl
        onValueChange={(controls) => {
          onControlChange(controls)
        }}
        forms={[{ ...currentLookup }]}
      />
      <SearchComponent
        onAddClick={(users) => {
          onAddButtonClick(users)
        }}
        users={searchableUsers}
      />
      <div className={styles['user--container']}>
        {Object.keys(groupByUser).map((userId, index) => {
          return (
            <UserPermissionSlot
              key={index}
              users={groupByUser[userId]}
              onValueChange={(user) => {
                onUserPermissionChanged(user)
              }}
            ></UserPermissionSlot>
          )
        })}
      </div>
      <div className={styles['button-wrap']}>{buttons()}</div>
    </div>
  )
}

export default PermissionsSettings
