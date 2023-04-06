import React, { ReactElement, useEffect, useState } from 'react'
import ConfirmationPopup from '../../layouts/popup/ConfirmationPopup'
import Chips from '../../components/chip/Chip'
import { IForm } from '../../graphql/types/ApiTypes'
import { Add } from '@mui/icons-material'
import styles from './IndexPageStyle.module.scss'
import Button from '../shared/Button'
import TextInputField from '../shared/TextInputField'

interface ITagModal {
  selectedRows: IForm[]
  showTagModal: (args: boolean) => void
  updatedTags: (tags: string[]) => void
}

const TagModal: React.FC<ITagModal> = ({ selectedRows, showTagModal, updatedTags }): ReactElement => {
  const [newTag, setNewTag] = useState<string>('')
  const [saveTags, setSaveTags] = useState<string[]>([])
  useEffect(() => {
    let tags: string[] = []
    selectedRows.forEach((row) => {
      const nonNullTags = row.tags.filter((tag) => tag !== null) as string[]
      tags = [...tags, ...nonNullTags]
    })
    setSaveTags([...tags])
  }, [])
  const handleNewTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }
  const addNewTag = () => {
    // const data: IDataProps['tags'] = selectedRows.tags || []
    // data.push(newTag)
    // setSelectedRows({ selectedRows, tags: data })
    setSaveTags([...saveTags, newTag])
    setNewTag('')
  }

  const saveData = () => {
    // updateRowData(tempData)
    updatedTags([...saveTags])
    showTagModal(false)
  }

  const handleDeleteTag = (index: number) => {
    const tags = [...saveTags]
    tags.splice(index, 1)
    setSaveTags([...tags])
  }
  return (
    <ConfirmationPopup
      maxWidth="sm"
      header="Add/Remove Tags"
      body={
        <div style={{ height: '320px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', marginTop: '27px', alignItems: 'center' }}>
            <div>
              <TextInputField
                inputProps={{ style: { width: '360px' } }}
                labelText=""
                placeholder="Enter tag Name"
                value={newTag}
                onChange={handleNewTag}
                variant={'outlined'}
              />
            </div>
            <div>
              <Button
                size="large"
                startIcon={<Add />}
                onClick={addNewTag}
                style={{ marginLeft: '16px', minWidth: '100px' }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className={styles['chip--container']}>
            <Chips
              handleDeleteTag={handleDeleteTag}
              showPaginatedData={false}
              chipArray={saveTags || []}
              style={{ flexWrap: 'wrap' }}
            />
          </div>
        </div>
      }
      handleClose={() => {
        showTagModal(false)
      }}
    >
      <Button onClick={saveData} className={'mt-2 ml-2'} variant="contained">
        Save
      </Button>
      <Button
        className={'mt-2 ml-2'}
        variant="outlined"
        onClick={() => {
          showTagModal(false)
        }}
      >
        Cancel
      </Button>
    </ConfirmationPopup>
  )
}
export default TagModal
