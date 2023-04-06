import { IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { SORTING_TYPE } from '../../../constants/constants'
import styles from './CustomHeader.module.scss'
interface ISortingMenu {
  handleSorting: (type: string) => void
}

const SortingMenus: React.FC<ISortingMenu> = ({ handleSorting }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const ITEM_HEIGHT = 48
  const menus = [
    { id: 0, label: 'Sort Ascending', logo: '/images/ascending.svg', type: SORTING_TYPE.ASC },
    { id: 1, label: 'Sort Descending', logo: '/images/descending.svg', type: SORTING_TYPE.DSC },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (type: string) => {
    handleSorting(type)
    handleClose()
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
          src="/images/sort.svg"
          width={15}
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
            width: '15ch',
          },
        }}
      >
        {menus.map((menu) => (
          <MenuItem key={menu.id} className={styles['item']} onClick={() => handleSelect(menu.type)}>
            <img src={menu.logo} width={10} height={10} /> &nbsp; &nbsp; {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default SortingMenus
