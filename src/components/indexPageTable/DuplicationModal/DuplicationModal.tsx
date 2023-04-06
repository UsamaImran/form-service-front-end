import React from 'react'
import ConfirmationPopup from '../../../layouts/popup/ConfirmationPopup'
import Textarea from '../../textarea/Textarea'
import { Formik, ErrorMessage, Form } from 'formik'
import { duplicateFormValidationSchema } from '../../../schema/duplicateFormValidationSchema'
import Button from '../../shared/Button'
import styles from './DuplicationModal.module.scss'
import TextInputField from '../../shared/TextInputField'

export interface IDuplicationForm {
  showDuplicationForm: (shouldShow: boolean) => void
  onSavePress: (values: { name: string; purpose: string; tags: string; dbName: string }) => void
}
const DuplicationModal: React.FC<IDuplicationForm> = ({ showDuplicationForm, onSavePress }) => {
  const initialValues = {
    name: '',
    dbName: '',
    purpose: '',
    tags: '',
  }
  const handleSubmit = (values: { name: string; purpose: string; tags: string; dbName: string }) => {
    const { dbName, tags, name, purpose: formPurpose } = values
    onSavePress({ dbName, tags, name, purpose: formPurpose })
    showDuplicationForm(false)
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={duplicateFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <ConfirmationPopup
              header="Duplicate Form"
              maxWidth="sm"
              body={
                <div>
                  <div style={{ marginBottom: '25px' }}>
                    <TextInputField
                      value={values.name}
                      name="name"
                      labelText="Name"
                      onChange={handleChange}
                      variant={'outlined'}
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="name" />
                    </span>
                  </div>
                  <div>
                    <TextInputField
                      name="dbName"
                      value={values.dbName}
                      labelText="DB Name"
                      onChange={handleChange}
                      variant={'outlined'}
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="dbName" />
                    </span>
                  </div>
                  <div>
                    <Textarea
                      name="purpose"
                      value={values.purpose}
                      labelText="Form Purpose"
                      onChange={handleChange}
                      placeholder=""
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="purpose" />
                    </span>
                  </div>
                  <div>
                    <TextInputField
                      name="tags"
                      value={values.tags}
                      labelText="Tags"
                      onChange={handleChange}
                      variant={'outlined'}
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="tags" />
                    </span>
                  </div>
                </div>
              }
              handleClose={() => showDuplicationForm(false)}
            >
              <Form onSubmit={handleSubmit} className={styles.buttonContainer}>
                <Button variant="contained" type="submit" id="submit" className={styles.save}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    showDuplicationForm(false)
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </ConfirmationPopup>
          )
        }}
      </Formik>
    </>
  )
}

export default DuplicationModal
