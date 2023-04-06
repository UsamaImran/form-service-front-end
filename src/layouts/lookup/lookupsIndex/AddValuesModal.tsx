import { Button } from '@mui/material'
import { ILookupValue, ILookup } from 'graphql/types/ApiTypes'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import React from 'react'
import Textarea from '../../../components/textarea/Textarea'
import { LOOKUP_VALUES_STATE, SPLIT_BY_LINE_REGEX } from '../../../constants/constants'
import { ILookupValueExtended, useLookupContext } from '../../../context/lookupContext/LookupContainer'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import styles from '../LookupIndex.module.scss'

interface IAddValuesModal {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}
const AddValuesModal: React.FC<IAddValuesModal> = ({ handleClose }) => {
  const { setLookupValues } = useLookupContext()
  const router = useRouter()
  const { query } = router
  const queryRef = React.useRef(query)
  const [valuesList, setValuesList] = React.useState<string[]>([])

  const handleValuesChanges = (e: any) => {
    const value = e.target.value

    const valuesArray = value.split(SPLIT_BY_LINE_REGEX)
    const set = new Set<any>([...valuesArray].filter((value) => value))
    setValuesList(Array.from(set))
  }

  const handleSave = () => {
    const params = queryRef.current.id
    const newValues = valuesList.map((value) => {
      return {
        id: nanoid(),
        name: value,
        isActive: true,
        icon: '',
        lastEdited: new Date().toISOString(),
        lookupId: params,
        order: 1,
        state: LOOKUP_VALUES_STATE.NEW,
      }
    }) as ILookupValueExtended[]

    if (params) {
      setLookupValues((prev) => {
        // const order = prev[prev.length - 1]?.order + 1 || 1
        prev.push(...newValues)
        return prev
      })
    }
    handleClose(false)
  }

  const getModalMody = () => {
    const placeholder = 'Enter each value in a new line...'
    return (
      <div>
        <div>
          <small>
            Values <i>(seprate each value by a new line)</i>
          </small>
        </div>
        <div>
          <Textarea
            className={styles['textarea-custom']}
            placeholder={placeholder}
            onChange={(e) => handleValuesChanges(e)}
          />
        </div>
      </div>
    )
  }

  const buttons = () => {
    return (
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="contained" className={styles.save} onClick={() => handleSave()}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div>
      <ConfirmationPopup header={<h4>Add Values</h4>} body={getModalMody()} width="620px">
        {buttons()}
      </ConfirmationPopup>
    </div>
  )
}

export default AddValuesModal
