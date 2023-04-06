import * as Yup from 'yup'

export const lookupBasicSettingsValicationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  description: Yup.string().required('Description is required!'),
  tags: Yup.string().required('Tag is Required!'),
})
