import { Button } from '@mui/material'
import { nanoid } from 'nanoid'
import React from 'react'
import TextInputField from '../../../components/shared/TextInputField'
import Textarea from '../../../components/textarea/Textarea'
import { SPLIT_BY_LINE_REGEX } from '../../../constants/constants'
import { useLookupContext } from '../../../context/lookupContext/LookupContainer'
import { ILookup, ILookupValue } from '../../../context/lookupContext/LookupInterface'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import styles from '../LookupIndex.module.scss'

interface ICreateLookupModal {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateLookupModal: React.FC<ICreateLookupModal> = ({ handleClose }) => {
  const { updateLookups, setTempLookupId } = useLookupContext()
  const [valuesList, setValuesList] = React.useState<string[]>([])
  const [name, setName] = React.useState('')

  const handleValuesChanges = (e: React.ChangeEvent<any>) => {
    const value = e.target.value

    const valuesArray = value.split(SPLIT_BY_LINE_REGEX)
    const set = new Set<any>([...valuesArray].filter((value) => value))
    setValuesList(Array.from(set))
  }

  const handleNameChange = (e: React.ChangeEvent<any>) => {
    console.log(e, 'dDD')
    const value = e.target.value
    setName(value)
  }

  const onSave = () => {
    const ID = nanoid()
    if (name.length) {
      setTempLookupId(ID)

      const newValues = valuesList.map((value) => {
        return {
          id: nanoid(),
          valueName: value,
          isActive: true,
          icon: '',
        }
      }) as ILookupValue[]

      const newLookup: ILookup = {
        id: ID,
        name: name,
        canDuplicate: true,
        canView: true,
        childs: [],
        description: '',
        isActive: true,
        permissions: [],
        last_edited: new Date().toISOString(),
        parents: [],
        tags: [],
        relationships: [],
        values: [...newValues],
      }
      updateLookups((prevState) => {
        const prev = [...prevState]
        prev.push(newLookup)
        return prev
      })
    }

    handleClose(false)
  }

  const getModalBody = () => {
    const label = () => (
      <>
        Values <i>(seprate each value by a new line)</i>
      </>
    )

    return (
      <div style={{ height: '600px' }}>
        <div>
          <TextInputField variant="outlined" labelText="Lookup Name" onChange={handleNameChange} />
        </div>
        <div>
          <Textarea
            className={styles['textarea-custom']}
            onChange={(e) => handleValuesChanges(e)}
            labelText={label()}
          />
        </div>
      </div>
    )
  }

  const buttons = () => {
    return (
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="contained" className={styles.save} onClick={() => onSave()}>
          {'Save & Back'}
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div>
      <ConfirmationPopup header={<h4>Create Lookup</h4>} body={getModalBody()}>
        {buttons()}
      </ConfirmationPopup>
    </div>
  )
}

export default CreateLookupModal
