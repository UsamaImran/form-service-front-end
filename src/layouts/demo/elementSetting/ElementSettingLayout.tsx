import React, { ReactElement } from 'react'
import BasicTabs from '../../../components/tabPanel/TabPanel'
import CustomModal from '../../../components/customModal/CustomModal'
import Styles from './ElementSetting.module.scss'
import TextInputField from '../../../components/shared/TextInputField'

const BasictabChildren: React.FC = (): ReactElement => {
  return (
    <div style={{ width: 656 }}>
      <TextInputField className={Styles.textinputheight} labelText="Name*" variant={'outlined'} />
      <TextInputField className={Styles.textinputheight} labelText="DB Name*" variant={'outlined'} />
      <TextInputField className={Styles.textinputheight} labelText="Tags*" variant={'outlined'} />
    </div>
  )
}

const ElementSettings: React.FC = (): ReactElement => {
  const allTabs = [
    { label: 'Basic setting', children: <BasictabChildren /> },
    { label: 'Permission', children: <p>Permission</p> },
  ]
  return (
    <div>
      <CustomModal open={true}>
        <h2 className="mt-3">Form Settings</h2>
        <BasicTabs allTabs={allTabs} />
      </CustomModal>
    </div>
  )
}

export default ElementSettings
