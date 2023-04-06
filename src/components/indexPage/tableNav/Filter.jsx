import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import IconButton from '@mui/material/IconButton'

function Filter() {
  return (
    <>
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <FilterAltOutlinedIcon />
      </IconButton>
    </>
  )
}

export default Filter
