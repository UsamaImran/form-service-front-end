import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ITEM_HEIGHT = 48

export interface MenuDropdownItem {
  title: string
  icon: JSX.Element
  color?: string
}

interface MenuDropDownProps {
  options: MenuDropdownItem[]
  onChange: (id: number, value: number) => void
  selectedItem: number
}

export const MenuDropDown: React.FunctionComponent<MenuDropDownProps> = ({ options, onChange, selectedItem }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (event: React.MouseEvent<HTMLElement>, index: number) => {
    onChange(index, selectedItem)
    setAnchorEl(null)
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
        style={{ padding: 0, color: '#8C8C8C' }}
      >
        <MoreVertIcon />
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
            width: '11ch',
            border: '1px solid #BFBFBF',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => {
          const color = option.color ? option.color : '#333333'
          return (
            <MenuItem
              key={option.title}
              onClick={(event) => handleSelect(event, index)}
              sx={{
                '& .MuiSvgIcon-root': {
                  color,
                  fontSize: '15px',
                  marginRight: '10px',
                },
              }}
              style={{ color, fontSize: '14px', lineHeight: '16px' }}
            >
              {option.icon}
              {option.title}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
