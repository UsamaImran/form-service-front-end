import React, { ReactElement, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import { ListItemIcon, ListItemButton } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import styles from './Sidebar.module.scss'
import { SidebarList } from '../../constants/constants'
import { makeStyles } from '@mui/styles'
import LeftArrow from '../svgImages/LeftArrow'
import Tooltip from '../shared/Tooltip'

const drawerWidth = 250

interface SidebarProps {
  handleDrawerToggle(): void
  mobileOpen: boolean
  window?: () => Window
  sidebarToggle: boolean
  setSidebarToggle: (sidebarArgs: boolean) => void
}

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      border: 'none !important',
    },
  },
})

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
  window,
  sidebarToggle,
  setSidebarToggle,
}): ReactElement => {
  const classes = useStyles()
  const [menuToggle, setMenuToggle] = useState('')
  const [submenuVal, setSubmenuVal] = useState('')
  const [subMenuToggle, setSubMenuToggle] = useState('')

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle)
  }
  const drawer = (
    <div className={`${styles.container}`}>
      <div className={styles.sideBarWrapper}>
        <div className={styles.logo}>
          NGN<span>42</span>
        </div>
        {/* <Toolbar />  */}
        <List className={styles.list} component="nav" aria-labelledby="nested-list-subheader">
          {SidebarList.map((item, index) => {
            return (
              <div key={index}>
                <ListItemButton
                  key={item.label}
                  className={`${styles.listItmebutton}`}
                  onClick={() => setMenuToggle(menuToggle === item.label ? '' : item.label)}
                >
                  <div className={styles.listItemButtonWrapper}>
                    <ListItemIcon className={styles.listItemIcon}>
                      <img src={item.imgSrc} />
                    </ListItemIcon>
                    <div className={styles.listItemTextWrap}>
                      <div className={styles.listItemText}>{item.label}</div>
                      {item?.submenu ? (
                        <img
                          src="/images/expand.svg"
                          className={`${styles.expandImg} ${menuToggle === item.label ? styles.active : ''}`}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </ListItemButton>

                <div
                  className={`${styles.menuWrapper} ${menuToggle === item.label && item?.submenu ? styles.active : ''}`}
                >
                  {item?.submenu?.map((submenu, i) => (
                    <div key={i}>
                      <ListItemButton
                        key={submenu.menuHead}
                        className={`${styles.listItmebutton}`}
                        onClick={() => setSubMenuToggle(subMenuToggle === submenu.menuHead ? '' : submenu.menuHead)}
                      >
                        <div className={styles.listItemButtonWrapper}>
                          <div className={styles.submenuWrap}>
                            <div className={styles.subMenuTitle}>{submenu.menuHead}</div>
                            {submenu?.menu?.length ? (
                              <img
                                src="/images/expand.svg"
                                className={`${styles.expandImg} ${
                                  subMenuToggle === submenu.menuHead ? styles.active : ''
                                }`}
                              />
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </ListItemButton>
                      <div
                        className={`${styles.submenuWrapper} ${
                          subMenuToggle === submenu.menuHead && submenu?.menu ? styles.active : ''
                        }`}
                      >
                        <div className={styles.submenu}>
                          <ul>
                            {submenu?.menu.map((submenuItem, k) => (
                              <li
                                key={k}
                                onClick={() => setSubmenuVal(submenuItem.menuName)}
                                className={submenuVal === submenuItem.menuName ? `${styles.active}` : ''}
                              >
                                {submenuItem.menuName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </List>
      </div>
      <span className={styles.backArrow} onClick={handleSidebarToggle}>
        <Tooltip title="Close Sidebar" placement="bottom-end" arrow>
          <span>
            <LeftArrow />
          </span>
        </Tooltip>
      </span>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box
      className={
        sidebarToggle
          ? `${styles.boxContainer} ${styles.sideBarOpen} ${classes.root}`
          : `${styles.boxContainer} ${classes.root}`
      }
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#F2F2F2',
        }}
      ></AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links.  */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={styles.responsiveDrawer}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          className={styles.desktopDrawer}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderLeft: '2px solid #f2f2f2' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Sidebar
