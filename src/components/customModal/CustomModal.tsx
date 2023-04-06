import React, { ReactElement } from 'react'
import { Dialog, DialogProps as IDialogProps } from '@mui/material'
import CustomModalStyles from './CustomModal.module.scss'
import Button from '../shared/Button'

const CustomModal: React.FC<IDialogProps> = ({ children }): ReactElement => {
  return (
    <div className={CustomModalStyles['container']}>
      <Dialog
        maxWidth="sm"
        style={{ maxHeight: '300px', background: 'red !important' }}
        open={true}
        className={CustomModalStyles['container--ConfirmationPopup']}
      >
        {children}
        <div className={CustomModalStyles['container--buttonContainer']}>
          <div className={CustomModalStyles['container--buttonContainer--innerContainer']}>
            <Button style={{ padding: '22.5px 12px', width: '76px', height: '40px', marginRight: '16px' }}>
              Confirm
            </Button>
            <Button variant="outlined" style={{ padding: '22.5px 12px', width: '76px', height: '40px' }}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default CustomModal
