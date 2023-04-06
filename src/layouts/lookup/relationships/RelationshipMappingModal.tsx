import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import AutoComplete from '../../../components/autocomplete/AutoComplete'
import AutocompleteSwitch from '../../../components/autocompleteSwitch/AutocompleteSwitch'
import { LOOK_UP_RELATIONSHIP_TYPE } from '../../../constants/constants'
import { useLookupContext } from '../../../context/lookupContext/LookupContainer'
import { ILookup, ILookupRelationShip, ILookupValue } from '../../../context/lookupContext/LookupInterface'
import ConfirmationPopup from '../../popup/ConfirmationPopup'
import styles from '../LookupIndex.module.scss'
import CreateLookupModal from './CreateLookupModal'

interface IRelationshipMoal {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
  type: string
}

export interface IAutocompleteOption {
  id: number
  label: any
}
const customLabel = (label: string, icon: string) => {
  return (
    <span className={styles['custom-label-container']}>
      <img src={icon} />
      <span className="ml-1">
        <p style={{ color: '#0099CC' }}>{label}</p>
      </span>
    </span>
  )
}
const icon = <img src="/images/search.svg" />
const firstOption = { id: '0', name: customLabel('Create Lookup', '/images/add-icon_blue.svg') }

const RelationshipMappingModal: React.FC<IRelationshipMoal> = ({ handleClose, type }) => {
  const { lookups, getLookupById, updateLookups, getLookupIndexById, tempLookupId, setTempLookupId } =
    useLookupContext()
  const [autocompleteOptions, setAutoCompleteOptions] = React.useState<any[]>([])
  const [clearAutoComplete, setClearAutoComplete] = React.useState(false)
  const [currentLookup, setCurrentLookup] = React.useState<ILookup | undefined>(undefined)
  const [displayCreateLookupModal, setModal] = React.useState(false)
  const [selectedLookup, setSelectedLookup] = React.useState<ILookup | undefined>(undefined)
  const [lookupRelationShip, setLookupRelationShip] = React.useState<ILookupRelationShip[] | []>([])
  const [tempLookup, setTempLookup] = React.useState<ILookup | undefined>(undefined)
  const [parents, setParents] = React.useState<string[]>([])
  const [childs, setChilds] = React.useState<string[] | []>([])
  const router = useRouter()
  const isChild = type === LOOK_UP_RELATIONSHIP_TYPE.CHILD

  React.useEffect(() => {
    setCurrentLookup(getLookupById(router.query.id as string))
  }, [lookups, router])

  React.useEffect(() => {
    getAutoCompleteOptions()
  }, [currentLookup])

  React.useEffect(() => {
    setTempLookup(getLookupById(tempLookupId as string))
  }, [tempLookupId])

  const getAutoCompleteOptions = () => {
    const optionsList = lookups.filter((lookup) => lookup.id !== currentLookup?.id)
    //@ts-ignore
    optionsList.unshift(firstOption)
    setAutoCompleteOptions(optionsList)
  }

  const handleOptionSelect = (selectedOption: any) => {
    if (selectedOption?.id === '0') {
      setModal(true)
      setClearAutoComplete(true)
    } else {
      setClearAutoComplete(false)
      setSelectedLookup(selectedOption)
    }
  }

  const onValueSelect = (values: ILookupValue[], parentId: string) => {
    const parentLookupId = isChild ? currentLookup?.id : selectedLookup?.id
    const parentOptionId = !isChild ? values : parentId
    const childLookupId = isChild ? selectedLookup?.id : currentLookup?.id
    const childOptionId = !isChild ? parentId : values
    const relationships: any[] = []

    const parentsIds = type === LOOK_UP_RELATIONSHIP_TYPE.PARENT ? selectedLookup?.values.map((value) => value.id) : []
    const childsIds = type === LOOK_UP_RELATIONSHIP_TYPE.CHILD ? selectedLookup?.values.map((value) => value.id) : []

    console.log(parents, '=============', childs)

    console.log('parent', parentLookupId)
    console.log('parentValue', parentOptionId)
    console.log('child', childLookupId)
    console.log('childValue', childOptionId)

    if (!isChild) {
      //@ts-ignore
      parentOptionId.map((pid) => {
        relationships.push({
          parentLookupId,
          parentOptionId: pid.id,
          childLookupId,
          childOptionId,
        })
      })
    } else {
      //@ts-ignore
      childOptionId.map((cid) => {
        relationships.push({
          parentLookupId,
          parentOptionId,
          childLookupId,
          childOptionId: cid.id,
        })
      })
    }
    setParents(parentsIds as string[])
    setChilds(childsIds as string[])
    console.log(relationships, '==============', parentsIds, '+++++++++++++++++++', childsIds)
    setLookupRelationShip((prevState) => [...prevState, ...relationships])
  }

  const getValues = () => {
    const cLookup = getLookupById(tempLookupId)
    const condition = tempLookupId ? cLookup?.values : isChild ? currentLookup?.values : selectedLookup?.values
    return condition
  }

  const saveHandler = () => {
    try {
      const index = getLookupIndexById(currentLookup?.id as string)
      const temp = JSON.parse(JSON.stringify(currentLookup)) as ILookup
      temp?.parents.push(...parents)
      temp?.childs.push(...childs)
      temp?.relationships.push(...lookupRelationShip)

      updateLookups((prevState) => {
        const prev = [...prevState]
        if (index && prev) prev[index] = temp
        return prev
      })
      handleClose(false)
      setTempLookupId('')
    } catch (err) {
      console.log(err, 'ERRRRRRRRRRRRrrr')
      handleClose(false)
      setTempLookupId('')
    }
  }
  const getRelationshipValues = () => {
    return (
      <div className={styles['relationship-mapping-container']}>
        <table className={styles['relationship-table']}>
          {(tempLookupId || selectedLookup) && (
            <tr>
              <th style={{ width: '35%' }}>
                <b className={styles['relationship-label']}>{!isChild ? 'Parent Values' : 'Child Values'} </b>
              </th>
              <th>
                <b className={styles['relationship-label']}>{!isChild ? 'Child Values' : 'Parent Values'}</b>
              </th>
            </tr>
          )}

          {getValues()?.map((value: ILookupValue) => {
            return (
              <tr style={{ height: '90px' }}>
                <td>{value.valueName}</td>
                <td>
                  <AutocompleteSwitch
                    options={!isChild ? currentLookup?.values || [] : selectedLookup?.values || []}
                    onOptionSelect={onValueSelect}
                    parentId={value.id}
                  />
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }

  const getModalBody = () => {
    return (
      <div style={{ height: '500px' }}>
        <div className={styles['autocomplete-container']}>
          <div>
            <AutoComplete
              leftIcon={icon}
              labelText="Parent Lookup"
              options={isChild ? (currentLookup ? [{ ...currentLookup }] : []) : autocompleteOptions}
              optionsKey="label"
              handleSelectedOption={handleOptionSelect}
              clearInput={clearAutoComplete}
              disable={isChild}
              placeholder={isChild ? currentLookup && currentLookup.name : ''}
              // value={tempLookupId && tempLookup?.name}
            />
          </div>
          <div>
            <AutoComplete
              leftIcon={icon}
              labelText="Child Lookup"
              options={isChild ? autocompleteOptions : currentLookup ? [{ ...currentLookup }] : []}
              disable={!isChild}
              handleSelectedOption={handleOptionSelect}
              placeholder={!isChild ? currentLookup && currentLookup.name : tempLookupId ? tempLookup?.name : ''}
              // value={tempLookupId && tempLookup?.name}
            />
          </div>
          {displayCreateLookupModal && <CreateLookupModal handleClose={setModal} />}
        </div>
        {getRelationshipValues()}
      </div>
    )
  }

  const buttons = () => {
    return (
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="contained" className={styles.save} onClick={saveHandler}>
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
      <ConfirmationPopup header={<h4>Relationship Mapping</h4>} body={getModalBody()}>
        {buttons()}
      </ConfirmationPopup>
    </div>
  )
}

export default RelationshipMappingModal
