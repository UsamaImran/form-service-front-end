import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styles from '../LookupIndex.module.scss'
import BasicSettings from './BasicSettings'
import PermissionsSettings from './PermissionsSettings'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import { useRouter } from 'next/router'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
export interface ILookupSettingModal {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const LookupSettingsModal: React.FC<ILookupSettingModal> = ({ handleClose }) => {
  const getModalBody = () => {
    return <div>{<SettingTabs handleClose={handleClose} />}</div>
  }

  return (
    <div>
      <ConfirmationPopup header={<h4>Settings</h4>} body={<div>{getModalBody()}</div>} width="600px" />
    </div>
  )
}

export default LookupSettingsModal

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const SettingTabs: React.FC<ILookupSettingModal> = ({ handleClose }) => {
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  let tabs = [
    {
      label: 'Basic Settings',
      icon: <img src="/images/settingsIcon.svg" />,
      component: <BasicSettings handleClose={handleClose} />,
    },
    {
      label: 'Permissions',
      icon: <img src="/images/key_black.svg" />,
      component: <PermissionsSettings handleClose={handleClose} />,
    },
  ]

  if (!router.query.id) {
    tabs.shift()
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map((tab, index) => {
            return (
              <Tab
                className={styles['tab-nav']}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                {...a11yProps(index)}
              />
            )
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  )
}
