import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

interface LayoutProps {
  showNavbar?: boolean
  showSidebar?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  const [openDrawer, toggleDrawer] = useState<boolean>(false)
  const [sidebarToggle, setSidebarToggle] = useState(true)

  const toggleDrawerHandleToggler = (): void => {
    toggleDrawer(!openDrawer)
  }
  return (
    <div>
      <div className="leftPanel">
        <Sidebar
          mobileOpen={openDrawer}
          handleDrawerToggle={toggleDrawerHandleToggler}
          setSidebarToggle={setSidebarToggle}
          sidebarToggle={sidebarToggle}
        />
      </div>
      <div className={`${sidebarToggle ? 'sidebar-open rightPanel' : 'rightPanel'}`}>
        <Navbar
          handleDrawerToggle={toggleDrawerHandleToggler}
          setSidebarToggle={setSidebarToggle}
          sidebarToggle={sidebarToggle}
        />
        {children}
      </div>
    </div>
  )
}

export default Layout
