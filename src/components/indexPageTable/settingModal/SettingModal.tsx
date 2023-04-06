import React, { ReactElement, useEffect, useState } from 'react'
import Accordion from '../../../components/accordion/Acordian'
import AvailableColumns from '../../../components/availableColumns/AvailableColumns'
import ConfirmationPopup from '../../../layouts/popup/ConfirmationPopup'
import { IIndexColumn, IIndexSetting, IRowAction } from '../../../graphql/types/ApiTypes'
import RowActions from './RowActions'
import { makeStyles } from '@mui/styles'
import styles from './SettingModal.module.scss'
import Button from '../../shared/Button'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-elevation24': {
      margin: 0,
      maxWidth: '720px',
    },
    '& .MuiTypography-root .smooth-dnd-container.vertical > .smooth-dnd-draggable-wrapper': {
      display: 'table-row !important',
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
  },
}))

export interface ISettingModal {
  showSettingModal?: (args: boolean) => void
  indexSetting: IIndexSetting | undefined
  onSavePress: (rowAction: IRowAction[], columns: IIndexColumn[]) => void
  isPopup?: boolean
  buttonContainer?: string
}

const SettingModal: React.FC<ISettingModal> = ({
  indexSetting,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showSettingModal = () => {},
  onSavePress,
  isPopup = true,
}): ReactElement => {
  const [rowActionState, setRowAction] = useState<IRowAction[]>([])
  const [indexColumnState, setIndexColumn] = useState<IIndexColumn[]>([])
  const classes = useStyles()
  useEffect(() => {
    const rowActions = indexSetting?.rowAction as IRowAction[]
    const columns = indexSetting?.columns as IIndexColumn[]
    setRowAction(rowActions)
    setIndexColumn(columns)
  }, [indexSetting])

  const SettingModalBody = () => {
    return (
      <>
        <div className={styles.settingBody}>
          <Accordion label="Available Columns">
            <AvailableColumns columns={indexColumnState} setColumns={setIndexColumn} />
          </Accordion>
          <Accordion label="Row Actions">
            <RowActions rowActions={rowActionState} setRowAction={setRowAction} />
          </Accordion>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            className={'mr-2'}
            onClick={() => {
              onSavePress(rowActionState, indexColumnState)
              showSettingModal(false)
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              showSettingModal(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      {isPopup ? (
        <ConfirmationPopup
          maxWidth="lg"
          header="Index Page Setting"
          className={classes.root}
          body={SettingModalBody()}
          handleClose={() => {
            showSettingModal(false)
          }}
        ></ConfirmationPopup>
      ) : (
        <>{SettingModalBody()}</>
      )}
    </>
  )
}

export default SettingModal
