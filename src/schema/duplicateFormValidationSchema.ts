import * as Yup from 'yup'

export const duplicateFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  purpose: Yup.string().required('Purpose is required!'),
  dbName: Yup.string().required('DB name is required!'),
  tags: Yup.string().required('Tag is Required!'),
})
