import { useState, Fragment } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import IconsIndex from 'pages/uikit/icons'
import Breadcrumb from 'components/breadcrumb'

const style = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: 0.5,
  gridTemplateRows: 'auto',
  gridTemplateAreas: `"t c c c c c c c c c c c"`,
  py: 2,
}

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function UiKit() {
  const [value, setValue] = useState(0)
  const [tab, setTab] = useState('Icons')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClick = (label) => {
    setTab(label)
  }

  const DEFAULT_BREADCRUMB_LIST = [{ label: 'Home', link: '/' }, { label: 'UI Kit', link: '/uikit' }, { label: tab }]

  return (
    <Fragment>
      <div className="content">
        <Breadcrumb breadcrumbList={DEFAULT_BREADCRUMB_LIST} />
        <div className="indexHeadingContainer">
          <p className="indexHeading">Ui Kit - {tab}</p>
        </div>
        <Box sx={style}>
          <Box sx={{ gridArea: 't' }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Icons" onClick={() => handleClick('Icons')} {...a11yProps(0)} />
              <Tab label="Fonts" onClick={() => handleClick('Fonts')} {...a11yProps(1)} />
              <Tab label="Colors" onClick={() => handleClick('Colors')} {...a11yProps(2)} />
              <Tab label="Buttons" onClick={() => handleClick('Buttons')} {...a11yProps(3)} />
              <Tab label="Tooltip" onClick={() => handleClick('Tooltip')} {...a11yProps(4)} />
              <Tab label="Avatars" onClick={() => handleClick('Avatars')} {...a11yProps(5)} />
              <Tab label="Snackbar" onClick={() => handleClick('Snackbar')} {...a11yProps(6)} />
              <Tab label="Modals" onClick={() => handleClick('Modals')} {...a11yProps(7)} />
              <Tab label="TextInput" onClick={() => handleClick('TextInput')} {...a11yProps(8)} />
            </Tabs>
          </Box>
          <Box sx={{ gridArea: 'c', pl: '28px' }}>
            <TabPanel value={value} index={0}>
              <IconsIndex />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Fonts
            </TabPanel>
            <TabPanel value={value} index={2}>
              Colors
            </TabPanel>
            <TabPanel value={value} index={3}>
              Buttons
            </TabPanel>
            <TabPanel value={value} index={4}>
              Tooltip
            </TabPanel>
            <TabPanel value={value} index={5}>
              Avatars
            </TabPanel>
            <TabPanel value={value} index={6}>
              SnackBar
            </TabPanel>
            <TabPanel value={value} index={7}>
              Modals
            </TabPanel>
            <TabPanel value={value} index={8}>
              Text Input
            </TabPanel>
          </Box>
        </Box>
      </div>
    </Fragment>
  )
}

export default UiKit
