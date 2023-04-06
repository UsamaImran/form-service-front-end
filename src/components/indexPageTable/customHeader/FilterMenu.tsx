import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import styles from './CustomHeader.module.scss'

interface IFilterMenu {
  data: string[]
  handleFilter: (index: number[], isFilter: boolean) => void
}

interface ITransFormedData {
  label: string
  selected: boolean
}
const FilterMenu: React.FC<IFilterMenu> = ({ data, handleFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const ITEM_HEIGHT = 48
  const [dataState, setDataState] = React.useState<ITransFormedData[] | []>([])
  const [allSelected, setAllSelected] = React.useState(false)

  React.useEffect(() => {
    setDataState(getTransFormedData())
  }, [])

  const getTransFormedData = () => {
    return data.map((item) => ({ selected: false, label: item }))
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAllSelect = (allSelected: boolean) => {
    setAllSelected(!allSelected)
    setDataState((prevState) => {
      return prevState.map((item) => ({
        ...item,
        selected: !allSelected,
      }))
    })
    console.log(allSelected, 'alll')
    if (!allSelected) {
      const index = dataState.map((_, index) => index)
      handleFilter(index, false)
    } else {
      handleFilter([], false)
    }
  }

  const handleSelect = (index: number) => {
    let isFilter = false
    const selected: number[] = []
    setDataState((prevState) => {
      const array = [...prevState]
      array[index].selected = !prevState[index].selected

      isFilter = array.some((data) => data.selected === true)

      array.map((data, idx) => {
        if (data.selected === true) {
          selected.push(idx)
        }
      })

      return array
    })

    handleFilter(selected, isFilter)
    // handleClose()
  }

  return (
    <>
      <IconButton>
        <img
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          src="/images/filter.svg"
          width={10}
          className={styles['filter']}
        />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '25ch',
          },
        }}
      >
        <MenuItem onClick={() => handleAllSelect(allSelected)}>
          <input type="checkbox" checked={allSelected} title={allSelected ? 'Deselect All' : 'Select All'} />
        </MenuItem>
        {dataState.map((menu, index: number) => (
          <MenuItem key={index} className={styles['item']} onClick={() => handleSelect(index)}>
            <input type="checkbox" checked={menu.selected || false} /> &nbsp; {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default FilterMenu
