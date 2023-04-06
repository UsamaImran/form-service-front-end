import { Button, Divider, Switch } from '@mui/material'
import React from 'react'
import styles from '../LookupIndex.module.scss'
import { GridEditRowsModel, GridEnrichedColDef as SelectedValueTypes } from '@mui/x-data-grid'
import AddValuesModal from './AddValuesModal'
import { BaseDataGrid } from '../../../components/baseDataGrid/BaseDataGrid'
import QuickSearchToolbar from '../../../components/dataGrid/quickSearxhToolbar/QuickSearchbarToolbar'
import Dropdown from '../../../components/dropdown/Dropdown'
import LookupRelationShips from '../relationships/LookupRelationShips'
import { useRouter } from 'next/router'
import { ILookupValueExtended, useLookupContext } from '../../../context/lookupContext/LookupContainer'
import ToggleSwitch from 'components/shared/ToggleSwitch'
import { Tooltip } from '@mui/material'
import useWindowDimensions from 'customHooks/windowDimensions/useWindowDimensions'
import { ILookup, ILookupValue } from 'graphql/types/ApiTypes'
import { LOOKUP_VALUES_STATE, __TYPE_NAME } from 'constants/constants'
import { nanoid } from 'nanoid'
import { useAuthContext } from 'context/authContext/AuthContainer'
import { deleteLookupValue } from 'service/Lookup.services'

interface ColumnTypes {
  [key: string]: SelectedValueTypes
}

const ModifyLookup = () => {
  const {
    lookups,
    getLookupById,
    getLookupIndexById,
    lookupValues,
    getLookupValues,
    setLookupValues,
    getLookupValueIndexById,
  } = useLookupContext()
  const { user } = useAuthContext()
  const router = useRouter()
  const { query } = router
  const queryRef = React.useRef(query)
  const [currentLookup, setCurrentLookup] = React.useState<ILookup | undefined>(undefined)
  const [lookUpSearch, setLookUpSearch] = React.useState('')
  const [showInactive, setShowInactive] = React.useState<boolean | undefined>(undefined)

  const [filteredValues, setFilteredValues] = React.useState<ILookupValue[]>([])
  const [displayAddManyModal, setDisplayAddManyModal] = React.useState(false)
  const { isMobile } = useWindowDimensions()

  React.useEffect(() => {
    queryRef.current = router.query
    const id = queryRef.current.id as string
    if (id) {
      const current = getLookupById(id) as ILookup
      setCurrentLookup((prev) => ({ ...current }))
      getLookupValues(id as string)
    }
  }, [router, lookups])

  React.useEffect(() => {
    if (lookUpSearch.length || showInactive !== undefined) filterValues()
  }, [lookUpSearch, showInactive])

  const handleModal = () => {}

  const getIcon = () => <img src="/images/add_bulk.svg" height={25} />

  const columnName: ColumnTypes = {
    value: {
      field: 'name',
      headerName: 'Value',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      sortable: false,
      minWidth: 470,
      editable: true,

      renderCell: (props) => {
        return (
          <Tooltip title="double click to edit value" placement="top">
            <div className={styles['values-title']}>{props.formattedValue}</div>
          </Tooltip>
        )
      },
    },

    isActive: {
      field: 'isActive',
      headerName: 'Is Active',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'indexHeader',
      minWidth: 200,
      renderCell: (props) => {
        return (
          <ToggleSwitch
            defaultChecked={props.formattedValue}
            onChange={(e, checked) => handleSwitchChange(checked, props.id as string)}
          />
        )
      },
    },
    icon: {
      field: 'icon',
      headerName: 'Icon',
      type: 'text',
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'indexHeader',
      minWidth: 360,

      renderCell: (props) => {
        return (
          <div className={styles['value-dropdown']}>
            <span style={{ marginRight: '100px' }}>
              <Dropdown
                height="40px"
                width="180px"
                SelectDisplayProps={{ style: { padding: '13px 10px' } }}
                placeholder="Choose Icon"
                options={['1', '2', '3', '4', '5']}
                onChange={(e: any) => console.log(e.target, 'DDDDDDDDDDDDDDdd')}
              />
            </span>
            <span>
              <img
                className={styles['img']}
                src="/images/plus.svg"
                onClick={() => addLookupValue(props.id as string)}
              />
              &nbsp;
              <img
                className={styles['img']}
                src="/images/deleteIcon.svg"
                onClick={() => deleteLookupValues(props.id as string)}
              />
              &nbsp;
            </span>
          </div>
        )
      },
    },
  }

  const [globalVisibleColumns] = React.useState<Array<SelectedValueTypes>>(Object.values(columnName))

  const handleRowEdit = (model: GridEditRowsModel) => {
    const key = Object.keys(model)

    //@ts-ignore
    const value = model[key]?.name.value || ''
    setLookupValues((prev) => prev.map((item) => ({ ...item, name: item.id === key[0] ? value : item.name })))
  }

  const handleSwitchChange = (checked: boolean, valueId: string) => {
    setLookupValues((prev) =>
      prev.map((item) => ({ ...item, isActive: item.id === valueId ? checked : item.isActive })),
    )
  }

  const addLookupValue = (valueID: string) => {
    const params = queryRef.current.id
    // const valueIndex = getLookupValueIndexById(params as string, valueID) is to be added later
    if (params) {
      setLookupValues((prevState: ILookupValueExtended[]) => {
        const prev = [...prevState]
        const order = prev[prev.length - 1]?.order + 1 || 1
        const newValue = {
          id: nanoid(),
          name: '',
          icon: '',
          isActive: false,
          lastEdited: new Date().toISOString(),
          lookupId: params,
          order,
          state: LOOKUP_VALUES_STATE.NEW,
        } as ILookupValueExtended
        // prev.splice(valueIndex - 1, 0, newValue)
        prev.push(newValue)
        return prev
      })
    }
  }

  const deleteLookupValues = (id: string) => {
    setLookupValues((prev) =>
      prev.filter((value) => {
        if (value.state === LOOKUP_VALUES_STATE.CHANGE && value.id === id) deleteValuesFromDb([value.id])
        return value.id !== id
      }),
    )
  }

  const deleteValuesFromDb = async (ids: string[]) => {
    await deleteLookupValue({ id: [...ids] })
  }

  const filterValues = () => {
    const text = lookUpSearch.toLowerCase()
    const filter = lookupValues.filter((item) => item.name.toLowerCase().includes(text)) as ILookupValue[]
    const filter2 = lookupValues.filter((item) => item.isActive === false) || ([] as ILookupValue[])
    const values = showInactive ? [...filter2] : [...filter]
    setFilteredValues([...values])
  }

  const getHeaderOptions = () => (
    <div className={styles['header-options']}>
      <span className={styles['switch']}>
        <Switch
          name="Show Inactice"
          defaultChecked={showInactive}
          onChange={(e) => {
            setShowInactive(e.target.checked)
          }}
        />
        Show Inactive
      </span>
      <span>
        <Button
          startIcon={getIcon()}
          onClick={() => {
            setDisplayAddManyModal(true)
          }}
        >
          Add Many
        </Button>
      </span>
    </div>
  )

  const getHeader = () => {
    return (
      <div className={styles['header']}>
        <QuickSearchToolbar
          value={lookUpSearch}
          placeholder={'Search values'}
          clearSearch={() => setLookUpSearch('')}
          onChange={(e) => setLookUpSearch(e.target.value)}
          showModalIcons={false}
          handleModal={handleModal}
        />
        {getHeaderOptions()}
      </div>
    )
  }

  const getTable = () => {
    return (
      <div className={styles['values-table-container']}>
        <BaseDataGrid
          id="Lookups"
          page={0}
          pageSize={100}
          rowCount={1}
          columns={globalVisibleColumns}
          rows={lookUpSearch.length || showInactive !== undefined ? filteredValues : lookupValues}
          showPagination={false}
          handlePageSize={() => {}}
          handleCurrentPageChange={() => {}}
          showToolbar={false}
          handleRowEdit={handleRowEdit}
        />
      </div>
    )
  }

  const getLeftContainer = () => {
    return (
      <div className="mr-4">
        {getHeader()}
        {getTable()}
        {displayAddManyModal && <AddValuesModal handleClose={setDisplayAddManyModal} />}
      </div>
    )
  }

  const getRightContainer = () => {
    return (
      <>
        {!isMobile && <Divider orientation="vertical" color="#bfbfbf" style={{ height: '70vh' }} />}
        <LookupRelationShips />
      </>
    )
  }

  return (
    <React.Fragment>
      <div className={styles['container']}>
        <div className={styles['left-container']}>{getLeftContainer()}</div>
        <div className={styles['right-container']}>{getRightContainer()}</div>
      </div>
    </React.Fragment>
  )
}

export default ModifyLookup
