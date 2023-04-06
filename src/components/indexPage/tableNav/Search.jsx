import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Box from '@mui/material/Box'

function Search() {
  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <IconButton type="submit" aria-label="search" sx={{ my: 0, px: 0 }}>
          <SearchOutlinedIcon />
        </IconButton>
        <InputBase
          sx={{ px: 1 }}
          placeholder="Search for something"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Box>
    </>
  )
}

export default Search
