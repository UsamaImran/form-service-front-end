import React, { ReactElement, useEffect } from 'react'
import { FormSettingStyles, PermissionModalData } from './FormSetting.data'
import BasicTabs, { IAllTabProp } from '../../../components/tabPanel/TabPanel'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import styles from './FormSetting.module.scss'
import BasicSetting from './BasicSetting'
import PermissionModal from '../../indexSetting/PermissionModal/PermissionModal'
import { IIndexColumn, IIndexSetting, IRowAction } from '../../../graphql/types/ApiTypes'
import { getIndexSetting, updateIndexSetting } from '../../../components/indexPageTable/IndexPageTable.service'
import { excludeField } from '../../../helpers/helpers'
import SettingModal from '../../../components/indexPageTable/settingModal/SettingModal'

const FormSetting: React.FC = (): ReactElement => {
  const [indexSettings, setIndexSettings] = React.useState<IIndexSetting>()
  const [settingModal, showSettingModal] = React.useState<boolean>(false)
  const [permissionModal, showPermissionModal] = React.useState<boolean>(false)

  useEffect(() => {
    getSettingData()
  }, [])

  const getSettingData = async () => {
    try {
      let settings = (await getIndexSetting()) as IIndexSetting
      const rowActions = settings.rowAction.map((row) => excludeField(row, '__typename'))
      const columns = settings.columns.map((col) => excludeField(col, '__typename'))
      settings = {
        ...settings,
        rowAction: [...rowActions],
        columns: [...columns],
      }
      setIndexSettings(settings)
    } catch (err) {
      console.log('Error while fetching settings data')
    }
  }

  const saveIndexSetting = async (rowActions: IRowAction[], columns: IIndexColumn[]) => {
    try {
      if (indexSettings) {
        await updateIndexSetting({ input: { id: indexSettings.id, rowAction: [...rowActions], columns: [...columns] } })
        setIndexSettings({
          ...indexSettings,
          columns: [...columns],
          rowAction: [...rowActions],
        })
      }
    } catch (err) {
      console.log('Error while fetching Index Settings')
    }
  }

  const classes = FormSettingStyles()
  const AllTabs: Array<IAllTabProp> = [
    {
      label: 'Basic settings',
      children: <BasicSetting />,
      icon: <img height={16} width={16} src="/images/settings.svg" />,
      position: 'start',
    },
    {
      label: 'Index page settings',
      children: (
        <div className="Accordion_container">
          <SettingModal
            showSettingModal={showSettingModal}
            indexSetting={indexSettings}
            onSavePress={saveIndexSetting}
            buttonContainer="PermissionModal--container__ButtonContainer--position"
            isPopup={false}
          />
        </div>
      ),
      icon: <img height={16} width={16} src="/images/table_chart.svg" />,
      position: 'start',
    },
    {
      label: 'Permissions',
      children: (
        <div>
          <PermissionModal
            isPopUp={false}
            showHeader={false}
            buttonContainer="PermissionModal--container__ButtonContainer--position"
            forms={PermissionModalData}
            showPermissionModal={showPermissionModal}
          />
        </div>
      ),
      icon: <img src="/images/key_black.svg" />,
      position: 'start',
    },
  ]
  return (
    <div>
      <ConfirmationPopup
        className={`${classes.root} ${styles.mainLayout}`}
        titleClassName={styles.headerTitle}
        bodyClassName=""
        header="Form Settings"
        body={<BasicTabs allTabs={AllTabs} />}
      ></ConfirmationPopup>
    </div>
  )
}

export default FormSetting
