import React, { ReactElement, useState } from 'react'
import { Tabs, Tab, TabProps, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { WHITE } from '../../constants/color'

interface ITabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface IAllTabProp {
  label: string
  children: JSX.Element
  icon?: JSX.Element
  position?: TabProps['iconPosition']
}

interface IBasicTabsProps extends TabProps {
  allTabs: Array<IAllTabProp>
}

const useStyles = makeStyles({
  allBox: {
    marginRight: '16px',
    position: 'sticky',
    top: 0,
    width: '100%',
    backgroundColor: WHITE,
    zIndex: 99,
    '& > .MuiTabs-root': {
      minHeight: 'initial',
    },
  },
  tabsHeader: {
    '& .MuiTabs-flexContainer': {
      paddingBottom: '8px',
      paddingTop: '8px',
    },
  },
})

const TabPanel: React.FC<ITabPanelProps> = ({ children, value, index, ...other }): ReactElement => {
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

const BasicTabs: React.FC<IBasicTabsProps> = ({ allTabs = [] }): ReactElement => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const tabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.allBox}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={classes.tabsHeader}>
          {allTabs.map(({ label, icon, position }, index) => (
            <Tab
              icon={icon}
              iconPosition={position}
              key={label}
              label={<p style={{ fontSize: '14px' }}>{label}</p>}
              {...tabProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {allTabs.map(({ label, children }, index) => (
        <TabPanel key={label} value={value} index={index}>
          {children}
        </TabPanel>
      ))}
    </>
  )
}

export type { IAllTabProp }
export default BasicTabs
