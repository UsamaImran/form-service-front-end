import React, { ReactElement } from 'react'
import { Avatar, Divider, IconButton } from '@mui/material'
import ProfileMenu from './ProfileMenu'
// import SearchBar from '../searchbar/Searchbar'
import styles from './Navbar.module.scss'
import ToggleMenu from '../svgImages/ToggleMenu'
import RightArrow from '../svgImages/RightArrow'
import { SECONDARY_GREY } from '../../constants/color'
import NotificationIcon from '../svgImages/NotificationIcon'
import MainSearchbar from './MainSearchbar'
import { useAuthContext } from '../../context/authContext/AuthContainer'
import Tooltip from '../shared/Tooltip'

interface INavbar {
  image?: string
  handleDrawerToggle(): void
  sidebarToggle: boolean
  setSidebarToggle: (sidebarArgs: boolean) => void
}

const Navbar: React.FC<INavbar> = ({ handleDrawerToggle, sidebarToggle, setSidebarToggle }): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { user } = useAuthContext()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const notificationCount = 0

  const avatarLabel = user.username.split('')[0]?.toUpperCase() || ''

  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        <span className={styles.sidebarIcon} onClick={() => setSidebarToggle(!sidebarToggle)}>
          <div className={styles.menuIconWrap}>
            <ToggleMenu />
          </div>
          <Tooltip title="Open Sidebar" placement="bottom-end" arrow className={styles.menuIconTooltip}>
            <div className={styles.openMenuIcon}>
              <RightArrow />
            </div>
          </Tooltip>
        </span>
        <div onClick={handleDrawerToggle} className={styles.menuIcon}>
          <ToggleMenu />
        </div>
        <div className={styles.logo}>
          NGN<span>42</span>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.leftPanel}>
          <MainSearchbar />
          {/* <SearchBar
            onChange={() => {
              console.log('On Value Change')
            }}
          /> */}
        </div>
        <div className={styles.rightPanel}>
          <IconButton
            size="large"
            sx={{ backgroundColor: SECONDARY_GREY, width: 40, height: 40, padding: 0, margin: '0px 16px' }}
          >
            <NotificationIcon />
            {notificationCount !== 0 ? (
              <span className={styles.blueBell}>
                <sup>{notificationCount > 9 ? '9+' : notificationCount}</sup>
              </span>
            ) : (
              ''
            )}
          </IconButton>
          <Divider orientation="vertical" className={styles.divider} />
          <Avatar onClick={handleClick} className={styles.profile}>
            {avatarLabel}
          </Avatar>
          <ProfileMenu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} />
        </div>
      </div>
    </div>
  )
}
export default Navbar
