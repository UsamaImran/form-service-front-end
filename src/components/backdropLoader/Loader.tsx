import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { SECONDARY_BUTTON } from '../../constants/color'

export default function Loader() {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress sx={{ color: SECONDARY_BUTTON }} />
      </Backdrop>
    </div>
  )
}
