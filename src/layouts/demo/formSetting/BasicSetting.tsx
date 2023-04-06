import React, { ReactElement, useState, useReducer, useEffect } from 'react'
import { arrayMoveMutable } from 'array-move'
import { DropResult, OnDropCallback } from 'smooth-dnd'
import Chips from '../../../components/chip/Chip'
import SortableList from '../../../components/sortableList/SortableList'
import Textarea from '../../../components/textarea/Textarea'
import { FormSettingActions } from '../../../constants/constants'
import NestedDropdown from '../../../components/nestedDropdown/NestedDropdown'
import { DropdownData, IBaseLevelProps } from './FormSetting.data'
import styles from './FormSetting.module.scss'
import Button from '../../../components/shared/Button'
import TextInputField from '../../../components/shared/TextInputField'
import { useRouter } from 'next/router'

interface IFormSettingStateProps {
  name: string
  db_name: string
  menu: Array<string>
  sub_menu: Array<string>
  form_purpose: string
  tags: string
}

const initialState = {
  name: '',
  db_name: '',
  menu: [],
  sub_menu: [],
  form_purpose: '',
  tags: '',
}

const FormSettingReducer = (state: IFormSettingStateProps = initialState, action: { type: string; value: any }) => {
  if (Object.keys(FormSettingActions).indexOf(action.type)) {
    return {
      ...state,
      [action.type]: action.value,
    }
  }
  return state
}

const BasicSetting: React.FC = (): ReactElement => {
  const [subMenu, setSubMenu] = useState([])
  const [state, FormSettingDispatcher] = useReducer(FormSettingReducer, initialState)
  const [dropDownValue, setDropDownValue] = useState('Strategy')
  const router = useRouter()
  const [tagData, setTagData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  useEffect(() => {
    for (let i = 0; i < DropdownData.length; i++) {
      if (DropdownData[i].children) {
        const subLevel = DropdownData[i]?.children || []
        const subMenu = subLevel.find((item) => item.label === dropDownValue)
        if (subMenu && subMenu?.children) {
          setSubMenu(subMenu?.children.map((item: IBaseLevelProps) => item.label) as never[])
          return
        }
      }
    }
    setSubMenu([])
  }, [dropDownValue])

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    FormSettingDispatcher({ type: 'name', value: e.target.value })
  }

  const handleDBName = (e: React.ChangeEvent<HTMLInputElement>) => {
    FormSettingDispatcher({ type: 'db_name', value: e.target.value })
  }

  const handleFormPurpose = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    FormSettingDispatcher({ type: 'form_purpose', value: e.target.value })
  }

  const onDrop: OnDropCallback = ({ removedIndex, addedIndex }: DropResult) => {
    const newItems = [...subMenu]
    const remIdx: number = removedIndex !== null ? removedIndex : 0
    const addIdx: number = addedIndex !== null ? addedIndex : 0
    arrayMoveMutable(newItems, remIdx, addIdx)
    setSubMenu(newItems)
  }
  const handleDropDownValue = (value: string): void => {
    setDropDownValue(value)
  }

  const handleDeleteTag = (deletedIndex: number): void => {
    const reducedArray = [...tagData]
    reducedArray.splice(deletedIndex, 1)
    setTagData(reducedArray)
  }

  return (
    <>
      <TextInputField
        placeholder="Supplier File"
        labelText="Name"
        onChange={handleName}
        required
        variant={'outlined'}
      />
      <TextInputField
        placeholder="Supplier"
        onChange={handleDBName}
        containerClassName="mt-3"
        labelText="DB Name"
        labelIcon={<img src="/images/info.svg" />}
        required
        variant={'outlined'}
      />
      <NestedDropdown
        containerClassName="mt-3"
        DropdownData={DropdownData}
        labelText="Menu"
        value={dropDownValue}
        setValue={handleDropDownValue}
      />
      <SortableList
        onDrop={onDrop}
        mainContainer="mt-3"
        containerClassName={styles.draggableList}
        label="Menu Position"
        data={subMenu}
        innerContainerClassName={styles.draggableListContainer}
      />
      <Textarea
        placeholder="Explain the purpose of the form and what data can be extracted and analyzing by using it"
        onChange={handleFormPurpose}
        labelText="Form purpose"
      />
      <p className={styles.chipHeading}>Tags</p>
      <div className={styles.chipContainer}>
        <Chips
          showPaginatedData={false}
          chipArray={tagData.map((item) => `Tag ${item}`)}
          handleDeleteTag={handleDeleteTag}
        />
      </div>
      <div className={styles.buttonWrap}>
        <div className={styles.buttonContainer}>
          <Button className={'mr-2'} variant="contained" onClick={() => null}>
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              router.push('/demo')
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  )
}
export default BasicSetting
