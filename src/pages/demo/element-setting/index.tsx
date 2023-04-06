import React, { ReactElement } from 'react'
import withAuth from '../../../hoc/withAuth'
import ElementSettingLayout from '../../../layouts/demo/elementSetting/ElementSettingLayout'

const ElementSettings: React.FC = (): ReactElement => {
  return <ElementSettingLayout></ElementSettingLayout>
}

export default withAuth(ElementSettings)
