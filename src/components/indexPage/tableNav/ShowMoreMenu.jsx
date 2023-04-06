import { useState } from 'react'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

function ShowMoreMenu() {
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Divider sx={{ height: 50, my: 1 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            {' '}
            <ArticleOutlinedIcon fontSize="small" />{' '}
          </ListItemIcon>
          <ListItemText>Log</ListItemText>
          {/* <Typography variant="body2" color="text.secondary"> ⌘L  </Typography> */}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            {' '}
            <SettingsOutlinedIcon fontSize="small" />{' '}
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
          {/* <Typography variant="body2" color="text.secondary"> ⌘S  </Typography> */}
        </MenuItem>
      </Menu>
    </>
  )
}

export default ShowMoreMenu
