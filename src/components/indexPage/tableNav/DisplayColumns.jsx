import Divider from '@mui/material/Divider'
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined'
import IconButton from '@mui/material/IconButton'

function DisplayColumns() {
  return (
    <>
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <ViewColumnOutlinedIcon />
      </IconButton>
      <Divider sx={{ height: 50, my: 1 }} orientation="vertical" />
    </>
  )
}

export default DisplayColumns
