import React, { useState, Fragment, useEffect } from 'react'
import { Avatar, Tooltip } from '@mui/material'
import { GridEnrichedColDef as SelectedValueTypes } from '@mui/x-data-grid'
import { BaseDataGrid } from '../baseDataGrid/BaseDataGrid'
import styles from './LookupPageTable.module.scss'
import Chips from '../chip/Chip'
import { PRIMARY_BUTTON } from '../../constants/color'
import { useRouter } from 'next/router'
import { ROUTE_LOOK_UP } from '../../constants/routes'
import { useLookupContext } from '../../context/lookupContext/LookupContainer'
import ToggleSwitch from 'components/shared/ToggleSwitch'
import { ILookup } from 'graphql/types/ApiTypes'
import { updateLookup } from 'service/Lookup.services'

interface ColumnTypes {
  [key: string]: SelectedValueTypes
}

interface ILookupTabe {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const LookupPageTable: React.FC<ILookupTabe> = ({ isOpen, setIsOpen }) => {
  const { lookups, updateLookups, getLookupById, getLookupIndexById } = useLookupContext()
  const [lookupState, setLookupState] = React.useState<ILookup[]>([...lookups])
  const [lookupSearch, setLookupSearch] = React.useState('')
  const [pageSize, setPageSize] = React.useState(5)
  const [currentPage, setCurrentPage] = React.useState(0)
  const router = useRouter()

  useEffect(() => {
    setLookupState([...lookups])
  }, [lookups])

  const columnName: ColumnTypes = {
    name: {
      field: 'name',
      headerName: 'Name',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      sortable: false,
      renderCell: (props) => {
        const { formattedValue, id } = props
        return (
          <p
            style={{ color: PRIMARY_BUTTON, cursor: 'pointer' }}
            onClick={() => {
              setIsOpen(true)
              router.push(`${ROUTE_LOOK_UP}?id=${id}`)
            }}
          >
            {formattedValue}
          </p>
        )
      },
      minWidth: 200,
    },
    isActive: {
      field: 'isActive',
      headerName: 'Is Active',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      minWidth: 180,
      sortable: false,
      renderCell: (props) => {
        return (
          <ToggleSwitch
            defaultChecked={props.formattedValue}
            onChange={(e, checked) => handleActiveChange(checked, props.id as string)}
          />
        )
      },
    },
    lastEdited: {
      field: 'lastEdited',
      headerName: 'Last edited',
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
      minWidth: 180,
      sortable: false,
      renderCell: ({ formattedValue }) => formattedValue.substring(0, 10),
    },
    editedBy: {
      field: 'editedBy',
      headerName: 'Edited by',
      sortable: false,
      filterable: false,
      headerClassName: 'indexHeader',
      minWidth: 180,
      renderCell: ({ formattedValue }) => {
        const { avatar, username } = formattedValue
        return (
          <Tooltip title={username} placement="top" arrow>
            <Avatar src={avatar} />
          </Tooltip>
        )
      },
      disableColumnMenu: true,
    },
    tags: {
      field: 'tags',
      headerName: 'Tags',
      sortable: false,
      minWidth: 280,
      renderCell: (props) => {
        return <Chips handleDeleteTag={handleDeleteTag} remaining={props} chipArray={props.formattedValue} />
      },
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
    },
    actions: {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 120,
      disableColumnMenu: true,
      headerClassName: 'indexHeader',
    },
  }

  const [globalVisibleColumns] = useState<Array<SelectedValueTypes>>(Object.values(columnName))
  const handleModal = () => {
    console.log('Modal')
  }
  const handleCurrentPageChange = (cPage: number) => {
    setCurrentPage(cPage)
  }
  const handlePageSize = (size: number) => {
    setPageSize(size)
  }

  const handleActiveChange = async (checked: boolean, id: string) => {
    try {
      await updateLookup({ input: { id, isActive: checked } })
      const target = getLookupById(id)
      updateLookups((prevState: ILookup[]) => {
        const prev = [...prevState]
        return prev.map((lookup: ILookup) => {
          return {
            ...lookup,
            isActive: lookup.id === target?.id ? checked : lookup.isActive,
          }
        })
      })
    } catch (err) {
      console.log('error while updating ', err)
    }
  }

  const handleDeleteTag = (deletedIndex: number, rowId: string) => {
    try {
      updateLookups((prevState: ILookup[]) => {
        const prev = [...prevState]
        const current = prev.find((lookup) => lookup.id === rowId) as ILookup
        const tags = [...current.tags].filter((_, index) => index !== deletedIndex)
        current.tags = tags
        const newState = prev.map((lookup) => {
          if (lookup.id === rowId) return current
          return lookup
        })
        removeTag(current)
        return newState
      })
    } catch (err) {
      console.log('error while deleting a tag', err)
    }
  }

  const removeTag = async (current: ILookup) => {
    const { id, tags } = current
    await updateLookup({ input: { id, tags } })
  }

  return (
    <Fragment>
      <div className={styles['parent-container']}>
        <div className={styles['container']}>
          <BaseDataGrid
            id="Lookups"
            columns={globalVisibleColumns}
            rows={lookupState}
            rowCount={lookupState.length}
            pageSize={pageSize}
            page={currentPage}
            handleCurrentPageChange={handleCurrentPageChange}
            handlePageSize={handlePageSize}
            showPagination={true}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default LookupPageTable
