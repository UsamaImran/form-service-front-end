import React, { ReactElement } from 'react'
import Box from '@mui/material/Box'
import Modal, { ModalProps } from '@mui/material/Modal'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '720px',
  bgcolor: 'background.paper',
  background: '#FFFFFF',
  boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.12)',
  borderRadius: '8',
  '@media (max-width:500px)': {
    width: 400,
    height: 400,
  },
  overflow: 'hidden',
}
interface IModal extends ModalProps {
  onClose: () => void
}
const BasicModal: React.FC<IModal> = ({ open, onClose, children }): ReactElement => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

export default BasicModal
