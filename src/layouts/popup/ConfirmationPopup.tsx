import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from '@mui/material'
import styles from './ConfirmationPopup.module.scss'

interface IPopup {
  header?: string | JSX.Element
  body?: string | JSX.Element
  handleClose?: () => void
  maxWidth?: DialogProps['maxWidth']
  className?: string
  titleClassName?: string
  bodyClassName?: string
  width?: string
  height?: string
}
const ConfirmationPopup: React.FC<IPopup> = ({
  maxWidth = 'md',
  header,
  body,
  handleClose,
  children,
  className,
  titleClassName = '',
  bodyClassName = '',
  width = 'auto',
  height = 'auto',
}): React.ReactElement => {
  return (
    <Dialog
      maxWidth={maxWidth}
      className={className}
      open={true}
      onClose={handleClose}
      fullWidth={true}
      sx={{ width: width, marginLeft: 'auto', marginRight: 'auto', height: height }}
    >
      <DialogTitle id="alert-dialog-title" className={titleClassName}>
        {header}
      </DialogTitle>
      <DialogContent className={`${styles['container']} ${bodyClassName}`}>
        <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  )
}

ConfirmationPopup.defaultProps = {
  header: 'Are you sure you want to delete',
  body: 'It will delete all the file from your system',
}

export default ConfirmationPopup
