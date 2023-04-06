import React, { ReactElement, Fragment, useEffect, useState } from 'react'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import styles from './PermissionModal.module.scss'
import { FormPermissionInput, FormUpdateInput } from '../../../graphql/types/graphql-global-types'
import { groupBy } from '../../../helpers/helpers'
import HeaderControl, { IPermissionControls } from '../../../components/indexPageTable/PermissionModal/HeaderControl'
import { IForm, IUser } from '../../../graphql/types/ApiTypes'
import { NetworkService } from '../../../service/networkService'
import SearchComponent from '../../../components/indexPageTable/PermissionModal/SearchComponent'
import UserPermissionSlot from '../../../components/indexPageTable/PermissionModal/UserPermissionSlot'
import { useCompanyContext } from '../../../context/companyContext/CompanyContainer'
import Button from '../../../components/shared/Button'

export interface IUserPermission {
  access: string
  id?: string
  user?: IUser
}
export interface ICustomForm {
  id: string
  canDuplicate: boolean
  canView: boolean
  permission: IUserPermission[]
}
interface IGroupUser {
  [key: string]: IUserPermission[]
}

export interface IPermissionModal {
  forms: IForm[]
  showPermissionModal: (args: boolean) => void
  showHeader?: boolean
  buttonContainer?: string
  isPopUp?: boolean
}
const PermissionModal: React.FC<IPermissionModal> = ({
  forms,
  showPermissionModal,
  showHeader = true,
  buttonContainer = '',
  isPopUp = true,
}): ReactElement => {
  const { users, refetchForm } = useCompanyContext()
  const [isLoading, showLoader] = useState<boolean>(false)
  const [updatedForm, updateForm] = useState<ICustomForm[]>([])
  const [searchableUsers, setSearchableUsers] = useState<IUser[]>([])
  const [groupByUser, setGroupByUser] = useState<IGroupUser>({})

  useEffect(() => {
    updateForm(getTransFormedForms())
  }, [forms])

  useEffect(() => {
    const formUsers = getAllFormsUsers()
    const nonFormUsers = getNonFormUsers(formUsers)
    const groupByUser = groupBy('id', formUsers)
    setGroupByUser(groupByUser)
    setSearchableUsers([...nonFormUsers])
  }, [updatedForm])

  const getTransFormedForms = () => {
    const transformed = forms.map((form) => ({
      canDuplicate: form.canDuplicate,
      canView: form.canDuplicate,
      id: form.id,
      permission: form.permission.map((per) => {
        return {
          access: per?.access,
          user: per?.user,
        } as IUserPermission
      }),
    }))
    return transformed
  }

  const onControlChange = (controls: IPermissionControls) => {
    const updateForms = updatedForm.map((form) => {
      return {
        ...form,
        ...controls,
      }
    })
    updateForm([...updateForms])
  }

  const onAddButtonClick = (userIds: string[]) => {
    const localForms = [...updatedForm]
    userIds.forEach((id) => {
      const userIndex = users.findIndex((user) => user._id === id)
      localForms.forEach((form) => {
        form.permission.push({
          access: 'view',
          user: users[userIndex],
        })
      })
    })
    updateForm([...localForms])
  }

  const onUserPermissionChanged = (user: IUserPermission) => {
    const localForms = [...updatedForm]
    localForms.map((form) => {
      const permission = [...form.permission]
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
      form.permission = updatedPermissions
    })
    console.log('Updated Permission:', localForms)
    updateForm([...localForms])
  }
  const getNonFormUsers = (formUsers: IUserPermission[]) => {
    const formUserIds = formUsers.map((formUser) => formUser.user?._id)
    return users.filter((user) => {
      return !formUserIds.includes(user._id)
    })
  }
  const getAllFormsUsers = () => {
    let formUsers: IUserPermission[] = []
    updatedForm.forEach((form: ICustomForm) => {
      formUsers = [...formUsers, ...form.permission]
    })

    return formUsers.map((user) => {
      return {
        ...user,
        id: user.user?._id,
      }
    })
  }

  const transformToPermission = (permission: IUserPermission[]) => {
    return permission.map((per) => {
      return {
        access: per.access,
        user: per?.user?._id || '',
      } as FormPermissionInput
    })
  }
  const onSaveButtonClick = () => {
    const mapForServer = updatedForm.map((form) => {
      return {
        id: form.id,
        canDuplicate: form.canDuplicate,
        canView: form.canView,
        permission: transformToPermission(form.permission),
      } as FormUpdateInput
    })
    sendDataToServer(mapForServer)
  }

  const addUserToFormsServer = async (userIds: string[]) => {
    try {
      const formIds = updatedForm.map((form) => form.id)
      await NetworkService.AddUserToForm({ ids: formIds, userIds: userIds })
      onAddButtonClick(userIds)
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }
  const sendDataToServer = async (data: FormUpdateInput[]) => {
    try {
      showLoader(true)
      await NetworkService.UpdateMultiForm({ updateFormInput: data })
      refetchForm()
      showPermissionModal(false)
      showLoader(false)
    } catch (err) {
      console.log(err)
      showLoader(false)
    }
  }

  const getHeading = () => {
    const totalForms = updatedForm.length
    const name = forms[0]?.name
    return totalForms > 1 ? `'${name} + ${totalForms - 1}' more form permissions` : `'${name}' form permissions`
  }

  const renderHeader = () => {
    return (
      <Fragment>
        <div className={styles.container} style={{ pointerEvents: isLoading ? 'none' : 'all' }}>
          {showHeader ? <span className={styles.headerText}>{getHeading()}</span> : null}
          <HeaderControl
            onValueChange={(controls) => {
              onControlChange(controls)
            }}
            forms={updatedForm}
          />
          <SearchComponent
            onAddClick={(users) => {
              addUserToFormsServer(users)
              // onAddButtonClick(users)
            }}
            users={searchableUsers}
          />
          <div className={styles.userContainer}>
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
        </div>
      </Fragment>
    )
  }
  const buttons = () => {
    return (
      <div className={styles.buttonContainer}>
        <Button className={'mr-2'} variant="contained" onClick={() => onSaveButtonClick()}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => showPermissionModal(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <>
      {isPopUp ? (
        <ConfirmationPopup
          maxWidth="md"
          header=""
          body={renderHeader()}
          handleClose={() => {
            showPermissionModal(false)
          }}
        >
          {buttons()}
        </ConfirmationPopup>
      ) : (
        <>
          {renderHeader()}
          {buttons()}
        </>
      )}
    </>
  )
}

export default PermissionModal
