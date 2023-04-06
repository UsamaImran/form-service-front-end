import React, { ReactElement, useEffect, useState } from 'react'
import ConfirmationPopup from '../../layouts/popup/ConfirmationPopup'
import { IForm } from '../../graphql/types/ApiTypes'
import Button from '../shared/Button'

interface IDeleteModal {
  selectedRows: IForm[]
  showDeleteModal: (args: boolean) => void
  onDeletePress: () => void
}

const DeleteModal: React.FC<IDeleteModal> = ({ selectedRows, showDeleteModal, onDeletePress }): ReactElement => {
  const [formName, setFormName] = useState<string>('')

  useEffect(() => {
    if (selectedRows.length === 1) {
      const name = selectedRows[0].name
      setFormName(`'${name}'`)
    } else if (selectedRows.length > 1) {
      const name = selectedRows[0].name
      setFormName(`'${name}' and more`)
    }
  }, [selectedRows])
  return (
    <ConfirmationPopup
      header={`Delete ${formName} element?`}
      maxWidth="sm"
      body={''}
      handleClose={() => {
        showDeleteModal(false)
      }}
    >
      <Button
        onClick={() => {
          onDeletePress()
          showDeleteModal(false)
        }}
        className={'mt-2'}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>
      <Button
        className={'mt-2 ml-4'}
        variant="outlined"
        onClick={() => {
          showDeleteModal(false)
        }}
      >
        Cancel
      </Button>
    </ConfirmationPopup>
  )
}
export default DeleteModal
