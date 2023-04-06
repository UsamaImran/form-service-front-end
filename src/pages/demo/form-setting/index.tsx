import React, { ReactElement } from 'react'
import withAuth from '../../../hoc/withAuth'
import FormSettingLayout from '../../../layouts/demo/formSetting/FormSettingLayout'

const FormSetting: React.FC = (): ReactElement => {
  return <FormSettingLayout></FormSettingLayout>
}

export default withAuth(FormSetting)
