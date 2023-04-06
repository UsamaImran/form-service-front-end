import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { IMenuOption } from '../../../graphql/types/ApiTypes'

interface IHeaderMenu {
  handleModal: (type: string) => void
  menus: IMenuOption[]
  menuIcon: JSX.Element
}

const HeaderMenus: React.FC<IHeaderMenu> = ({ handleModal, menus, menuIcon }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const ITEM_HEIGHT = 48

  const handleSelect = (type: string) => {
    handleModal(type)
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: 'transparent' }} // scss classes didn't work
      >
        {menuIcon}
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
          <MenuItem onClick={() => handleSelect(menu.type)} key={menu.id}>
            <img src={menu.logo} /> &nbsp; &nbsp; {menu.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default HeaderMenus
