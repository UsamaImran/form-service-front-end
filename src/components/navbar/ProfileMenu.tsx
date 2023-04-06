import React, { ReactElement } from 'react'
import { Divider, Menu as MenuMui, MenuItem, MenuProps } from '@mui/material'
import { makeStyles } from '@mui/styles'
import styles from './Navbar.module.scss'
import { useAuthContext } from '../../context/authContext/AuthContainer'
import Avatar from '../avatar/Avatar'

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      overflow: 'visible',
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.12)',
      width: 240,
      height: 216,
      borderRadius: '8px',
      padding: '16px 0px 8px',
      '& .MuiList-root': {
        padding: 0,
      },
    },
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      bgColor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
    '& .MuiMenuItem-root': {
      padding: '8px 16px',
    },
    '& .MuiMenuItem-root:hover': {
      background: '#f2f2f2',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 24,
    },
  },
})

const ProfileMenu: React.FC<MenuProps> = ({ anchorEl, open, onClose, onClick }: MenuProps): ReactElement => {
  const classes = useStyles()
  const { logoutUser, user } = useAuthContext()
  const { username, email, avatar } = user
  return (
    <div>
      <MenuMui
        className={classes.root}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        onClick={onClick}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <span className={styles['info-container']}>
          <span className="ml-2">
            <Avatar src={avatar} />
          </span>
          <span>
            <p className={styles.heading}>{username}</p>
            <span className={styles.subHeading}>{email}</span>
          </span>
        </span>
        <Divider className={styles.divider} />
        <MenuItem>
          <img className="mr-1" src="/images/account.svg" height={24} width={24} />
          <div className={styles.menuOptions}> Account</div>
        </MenuItem>
        <MenuItem>
          <img className="mr-1" src="/images/user_settings.svg" height={24} width={24} />
          <div className={styles.menuOptions}>User Settings</div>
        </MenuItem>
        <MenuItem onClick={() => logoutUser()}>
          <img className="mr-1" src="/images/logout.svg" height={24} width={24} />
          <div className={styles.menuOptions}>Logout</div>
        </MenuItem>
      </MenuMui>
    </div>
  )
}

export default ProfileMenu
