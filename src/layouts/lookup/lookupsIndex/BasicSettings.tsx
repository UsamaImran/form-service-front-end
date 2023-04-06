import { Button, Switch } from '@mui/material'
import ToggleSwitch from 'components/shared/ToggleSwitch'
import { Formik } from 'formik'
import { ILookup } from 'graphql/types/ApiTypes'
import { useRouter } from 'next/router'
import React from 'react'
import { updateLookup } from 'service/Lookup.services'
import TextInputField from '../../../components/shared/TextInputField'
import Textarea from '../../../components/textarea/Textarea'
import { useLookupContext } from '../../../context/lookupContext/LookupContainer'

import { lookupBasicSettingsValicationSchema } from '../../../schema/LookUpBasicSettingsValidationSchema'
import styles from '../LookupIndex.module.scss'
import { ILookupSettingModal } from './LookupSettingsModal'

const initial = {
  name: '',
  active: false,
  tags: '',
  description: '',
}

const BasicSettings: React.FC<ILookupSettingModal> = ({ handleClose }) => {
  const { getLookupById, lookups, updateLookups } = useLookupContext()
  const router = useRouter()
  const [currentLookup, setCurrentLookup] = React.useState<ILookup | undefined>(undefined)
  const [initialValues, setInitialValues] = React.useState({ ...initial })

  React.useEffect(() => {
    getCurrentLookup()
  }, [lookups, router])

  React.useEffect(() => {
    const initial = {
      name: currentLookup?.name || '',
      active: currentLookup?.isActive || false,
      tags: currentLookup?.tags ? currentLookup?.tags.join(', ') : '',
      description: currentLookup?.description || '',
    }
    setInitialValues(initial)
  }, [currentLookup])

  const getCurrentLookup = () => {
    const params = router.query.id as string
    const current = getLookupById(params) as ILookup
    setCurrentLookup({ ...current })
  }

  const handleSubmit = (values: { name: string; active: boolean; tags: string; description: string }) => {
    const { name, active, tags, description } = values

    const splittedTags = tags.split(',')

    updateLookups((prevState: ILookup[]) => {
      const prev = [...prevState]
      return prev.map((item) => {
        const isCurrent = item.id === currentLookup?.id
        if (isCurrent) updateLookuptoDB(item.id, item.name, item.isActive, item.tags, item.description)
        return {
          ...item,
          name: isCurrent ? name : item.name,
          description: isCurrent ? description : item.description,
          isActive: isCurrent ? active : item.isActive,
          tags: isCurrent ? [...splittedTags] : item.tags,
        }
      })
    })
    handleClose(false)
  }

  const updateLookuptoDB = async (id: string, name: string, isActive: boolean, tags: string[], description: string) => {
    await updateLookup({ input: { id, name, isActive, tags, description } })
  }

  const buttons = () => {
    return (
      <div className={[styles?.buttonContainer].join(' ')}>
        <Button type="submit" variant="contained" className={styles.save}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={lookupBasicSettingsValicationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleSubmit, handleChange, errors, handleBlur, touched }) => {
            return (
              <form onSubmit={handleSubmit} className={styles['form-container']}>
                <div>
                  <div className="mb-4">
                    <TextInputField
                      error={!!errors.name && touched.name}
                      helperText={errors.name && touched.name ? errors.name : ''}
                      value={values.name}
                      name="name"
                      variant="outlined"
                      onChange={handleChange}
                      labelText="Name"
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className={['mb-4', styles.switchContainer].join(' ')}>
                    <label>Active</label>
                    <ToggleSwitch name="active" checked={values.active} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <TextInputField
                      error={!!errors.tags && touched.tags}
                      helperText={errors.tags && touched.tags ? errors.tags : ''}
                      value={values.tags}
                      name="tags"
                      variant="outlined"
                      onChange={handleChange}
                      labelText="Tags"
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="mb-4">
                    <Textarea
                      error={!!errors.description && touched.description}
                      helperText={errors.description && touched.description ? errors.description : ''}
                      value={values.description}
                      name="description"
                      onChange={handleChange}
                      labelText="Description"
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div>{buttons()}</div>
              </form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}

export default BasicSettings
