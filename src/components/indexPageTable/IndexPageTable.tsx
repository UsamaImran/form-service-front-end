import React, { useState, ReactElement, useEffect, Fragment } from 'react'
import { Avatar } from '@mui/material'
import { format } from 'date-fns'
import {
  GridColumnHeaderParams,
  GridEnrichedColDef as SelectedValueTypes,
  GridRenderCellParams,
  GridSelectionModel,
} from '@mui/x-data-grid'
import { makeStyles } from '@mui/styles'
import { ActionType } from '../../constants/enums'
import Chips from '../../components/chip/Chip'
import ColumnDisplayedModal from './ColumnDispalyed'
import CustomDataGrid, { IDataProps } from '../../components/dataGrid/CustomDataGrid'
import DeleteModal from './DeleteModal'
import { deleteForms, getIndexSetting, updateIndexSetting } from './IndexPageTable.service'
import { duplicateForms, isAvailable, updateTags } from './IndexPageTable.helper'
import DuplicationModal from './DuplicationModal/DuplicationModal'
import { excludeField } from '../../helpers/helpers'
import { IForm, IIndexColumn, IIndexSetting, IRowAction } from '../../graphql/types/ApiTypes'
import { PRIMARY_BUTTON } from '../../constants/color'
import PermissionModal from '../../layouts/indexSetting/PermissionModal/PermissionModal'
import SettingModal from './settingModal/SettingModal'
import TagModal from './TagModal'
import { useCompanyContext } from '../../context/companyContext/CompanyContainer'
import CustomHeader from './customHeader/CustomHeader'
// interface ITagsTypeProps {
//   formattedValue: Array<string>
// }

// interface IChangeDropdownEvent {
//   value: string | number
//   idx: number
// }

interface TextTypeProps {
  formattedValue: string
}

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .hiding,.MuiCheckbox-root': {
      visibility: 'hidden',
    },

    '& .custom-row:hover .hiding,.custom-row:hover .MuiCheckbox-root': {
      visibility: 'visible',
    },
    '& .MuiDataGrid-columnHeaderTitleContainer >span': {
      visibility: 'visible  !important',
    },
    '& .Mui-checked': {
      visibility: 'visible',
    },

    '& .MuiDataGrid-selectedRowCount': {
      visibility: 'hidden',
    },
  },
})

interface ColumnTypes {
  [key: string]: SelectedValueTypes
}

const IndexPageTable: React.FC = (): ReactElement => {
  const { users, forms, refetchForm } = useCompanyContext()
  const [formState, setFormState] = React.useState([...forms])
  const [dataGridKey, resetDataGridKey] = useState<number>(0)
  const [tagModal, showTagModal] = useState<boolean>(false)
  const [deleteModal, showDeleteModal] = useState<boolean>(false)
  const [permissionModal, showPermissionModal] = useState<boolean>(false)
  const [settingModal, showSettingModal] = useState<boolean>(false)
  const [columnDisplayedModal, showColumnDisplayedModal] = useState<boolean>(false)
  const [formDuplicationModal, showFormDuplicationModal] = useState<boolean>(false)
  const [selectionModel, setSelectionModel] = React.useState<string[]>([])
  const [indexSettings, setIndexSettings] = React.useState<IIndexSetting>()
  const [isFilterEnabled, setIsFilterEnabled] = React.useState(false)
  const [filteredForms, setFilteredForms] = React.useState([...forms])

  const classes = useStyles()
  useEffect(() => {
    getSettingData()
  }, [])

  useEffect(() => {
    setFormState([...forms])
    setFilteredForms([...forms])
  }, [forms])

  const columnName: ColumnTypes = {
    Name: {
      field: 'name',
      headerName: 'Name',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      sortable: false,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <CustomHeader params={params} data={formState} setData={setFilteredForms} setFilter={setIsFilterEnabled} />
        )
      },
      renderCell: ({ formattedValue }: TextTypeProps) => {
        return <p style={{ color: PRIMARY_BUTTON }}>{formattedValue}</p>
      },
      minWidth: 120,
    },

    Menu: {
      field: 'menu',
      headerName: 'Menu',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'indexHeader',
      minWidth: 120,
    },
    'Sub Menu': {
      field: 'sub_menu',
      headerName: 'Sub Menu',
      type: 'text',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'indexHeader',
      minWidth: 120,
    },
    'Last Edited': {
      field: 'last_edited',
      headerName: 'Last edited',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      minWidth: 120,
      sortable: false,
    },
    'Edited By': {
      field: 'avatar',
      headerName: 'Edited by',
      sortable: false,
      filterable: false,
      headerClassName: 'indexHeader',
      minWidth: 120,
      renderHeader: (params: GridColumnHeaderParams) => {
        return (
          <CustomHeader params={params} data={formState} setData={setFilteredForms} setFilter={setIsFilterEnabled} />
        )
      },
      renderCell: () => {
        return <Avatar />
      },
      disableColumnMenu: true,
    },
    Tags: {
      field: 'tags',
      headerName: 'Tags',
      sortable: false,
      minWidth: 120,
      renderCell: (props) => {
        console.log(props, 'DDDD')
        return <Chips handleDeleteTag={handleDeleteTag} remaining={props} chipArray={props.formattedValue} />
      },
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
    },
    'Created By': {
      field: 'created_by',
      headerName: 'Created By',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      minWidth: 120,
      headerClassName: 'indexHeader',
    },
    'Created Date': {
      field: 'created_date',
      headerName: 'Created Date',
      disableColumnMenu: true,
      minWidth: 120,
      sortable: false,
      headerClassName: 'indexHeader',
    },
    Actions: {
      field: 'action',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      renderCell: ({ id }: GridRenderCellParams): React.ReactNode => (
        <div
          className="hiding"
          style={{
            width: '180px',
            display: 'flex',
            justifyContent: 'flex-start',
            cursor: 'pointer',
          }}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <img className="mr-1" src="/images/edit.svg" />

          {isActionAvailable(ActionType.ADD_REMOVE_PERMISSIONS) ? (
            <img
              className="mr-1"
              src="/images/key.svg"
              onClick={() => {
                handlePermissionRow(`${id}`)
              }}
            />
          ) : null}
          <img className="mr-1" src="/images/visibility.svg" />
          {isActionAvailable(ActionType.DUPLICATE) ? (
            <img onClick={() => handleDuplicateModalShow(`${id}`)} className="mr-1" src="/images/content_copy.svg" />
          ) : null}
          {isActionAvailable(ActionType.DELETE) ? (
            <img
              className="mr-1"
              onClick={() => {
                handleDeleteRow(`${id}`)
              }}
              src="/images/red_delete.svg"
            />
          ) : null}
        </div>
      ),
    },
  }

  const isActionAvailable = (action: ActionType, mode: 'single' | 'group' = 'single') => {
    if (indexSettings) {
      const rowActions = indexSettings.rowAction as IRowAction[]
      return isAvailable(rowActions, action, mode)
    }
    return false
  }
  const getSettingData = async () => {
    try {
      let settings = (await getIndexSetting()) as IIndexSetting
      const rowActions = settings.rowAction.map((row) => excludeField(row, '__typename'))
      const columns = settings.columns.map((col) => excludeField(col, '__typename'))
      settings = {
        ...settings,
        rowAction: [...rowActions],
        columns: [...columns],
      }
      setIndexSettings(settings)
    } catch (err) {
      console.log('Error while fetching settings data')
    }
  }
  const handleDeleteRow = (id: string) => {
    setSelectionModel([id])
    handleActionClick(ActionType.DELETE)
    // resetDataGridKey((prev) => prev + 1)
  }

  const handlePermissionRow = (id: string) => {
    setSelectionModel([id])
    handleActionClick(ActionType.ADD_REMOVE_PERMISSIONS)
    // resetDataGridKey((prev) => prev + 1)
  }
  const handleDeleteTag = (deletedIndex: number, rowId?: string): void => {
    try {
      const form = formState.find((form) => form.id === rowId) as IForm
      const tags = [...(form.tags || [])] as string[]
      tags.splice(deletedIndex, 1)
      saveUpdatedTags([rowId || ''], [...(tags || [])])
    } catch (err) {}
  }

  const handleDuplicateModalShow = (id: string) => {
    setSelectionModel([id])
    showFormDuplicationModal(true)
    resetDataGridKey((prev) => prev + 1)
  }

  // const deleteRowData = (id: string) => updateRowData((rowData) => rowData.filter((item) => item.id !== id))

  const [localVisibleColumns, updateLocalVisibleColumns] = useState<Array<SelectedValueTypes>>(
    Object.values(columnName),
  )
  // const [globalVisibleColumns, updateGlobalVisibleColumns] = useState<Array<SelectedValueTypes>>(
  //   Object.values(columnName),
  // )

  useEffect(() => {
    // updateVisibleColumns(Object.values(columnName))
    const columns = getColumnToShow()
    // updateGlobalVisibleColumns(Object.values(columns))
    const visibleColumns = columns.filter((column) => !column.hide)
    updateLocalVisibleColumns(Object.values(visibleColumns))
  }, [forms, formState, indexSettings])

  const getColumnToShow = () => {
    if (indexSettings) {
      const columns = indexSettings.columns as IIndexColumn[]
      const mapColumn = columns.map((col) => {
        const tableColumn = columnName[col.name]
        return {
          ...tableColumn,
          headerName: col.label,
          ...(col.maxWidth === 'auto' ? { flex: 1, minWidth: 57 } : { width: parseInt(col.maxWidth) }),
          hide: col.hidden,
        }
      })

      return [...mapColumn, columnName['Actions']]
    }
    return []
  }
  const handleActionClick = (action: string) => {
    switch (action) {
      case ActionType.ADD_REMOVE_TAGS:
        showTagModal(true)
        break
      case ActionType.DELETE:
        showDeleteModal(true)
        break
      case ActionType.ADD_REMOVE_PERMISSIONS:
        showPermissionModal(true)
        break
      case ActionType.Setting:
        showSettingModal(true)

        break
      case ActionType.Table:
        showColumnDisplayedModal(true)
        break
      case ActionType.DUPLICATE:
        showFormDuplicationModal(true)
        break
      default:
        break
    }
  }

  const getTransformedData = () => {
    const data = isFilterEnabled ? filteredForms : formState
    const transformed: IDataProps[] = data.map(
      (form) =>
        ({
          id: form.id,
          name: form.name,
          menu: form.menu,
          sub_menu: form.subMenu,
          last_edited: format(new Date(form.lastEdited), 'dd/mm/yyyy'),
          avatar: <Avatar key="avatar" />,
          tags: form.tags ? [...form.tags] : [],
          created_date: format(new Date(form.createdDate), 'dd/mm/yyyy'),
        } as IDataProps),
    )
    return transformed
  }

  const handleSelectionModel = (ids: GridSelectionModel) => {
    const formIds = ids.map((row) => row.toString())
    setSelectionModel([...formIds])
  }
  const handleVisibleColumns = (columns: Array<SelectedValueTypes>) => {
    // updateGlobalVisibleColumns(Object.values(localVisibleColumns))
    updateLocalVisibleColumns([...columns])
  }

  const getSelectedForms = () => {
    const selected = selectionModel.map((item) => item as string)
    const selectedForms = forms.filter((form: IForm) => selected.includes(form.id))
    return selectedForms as IForm[]
  }

  const saveUpdatedTags = async (forms: string[], tags: string[]) => {
    await updateTags(forms, tags)
    refetchForm()
    resetDataGridKey((prev) => prev + 1)
  }

  const deleteForm = async (forms: string[]) => {
    await deleteForms({ input: forms })
    refetchForm()
  }

  const saveIndexSetting = async (rowActions: IRowAction[], columns: IIndexColumn[]) => {
    try {
      if (indexSettings) {
        await updateIndexSetting({ input: { id: indexSettings.id, rowAction: [...rowActions], columns: [...columns] } })
        setIndexSettings({
          ...indexSettings,
          columns: [...columns],
          rowAction: [...rowActions],
        })
      }
    } catch (err) {
      console.log('Error while fetching Index Settings')
    }
  }

  const duplicateFormSave = async (data: any) => {
    // const { name, dbName, purpose, tags } = values
    // const formID = selectionModel[0]

    if (users.length > 0) {
      const duplicateData = { ...data }
      duplicateData.tags = duplicateData.tags.split(',')
      const selectedForms = forms.filter((form) => {
        return selectionModel.includes(form.id)
      })
      const userId = users[0]._id
      await duplicateForms(userId, selectedForms, duplicateData)
      refetchForm()
      resetDataGridKey((prev) => prev + 1)
    }
  }

  return (
    <Fragment>
      <CustomDataGrid
        dataGridClassName={classes.root}
        reset={dataGridKey}
        columns={localVisibleColumns}
        rows={getTransformedData()}
        className="custom-row"
        handleActionClick={handleActionClick}
        handleSelectionModel={handleSelectionModel}
        indexSettings={indexSettings}
      />

      {columnDisplayedModal ? (
        <ColumnDisplayedModal
          visibleColumns={localVisibleColumns}
          onSave={handleVisibleColumns}
          showModal={showColumnDisplayedModal}
        />
      ) : null}
      {tagModal ? (
        <TagModal
          selectedRows={getSelectedForms()}
          showTagModal={showTagModal}
          updatedTags={(tags) => {
            saveUpdatedTags(selectionModel, tags)
          }}
        />
      ) : null}
      {deleteModal ? (
        <DeleteModal
          selectedRows={getSelectedForms()}
          showDeleteModal={(value) => {
            showDeleteModal(value)
          }}
          onDeletePress={() => {
            deleteForm(selectionModel)
          }}
        />
      ) : null}
      {permissionModal ? (
        <PermissionModal forms={getSelectedForms()} showPermissionModal={showPermissionModal}></PermissionModal>
      ) : null}
      {settingModal ? (
        <SettingModal
          indexSetting={indexSettings}
          showSettingModal={showSettingModal}
          onSavePress={saveIndexSetting}
        ></SettingModal>
      ) : null}
      {formDuplicationModal && (
        <DuplicationModal showDuplicationForm={showFormDuplicationModal} onSavePress={duplicateFormSave} />
      )}
    </Fragment>
  )
}

export default IndexPageTable
