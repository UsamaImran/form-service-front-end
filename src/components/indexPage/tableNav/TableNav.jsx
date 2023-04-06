import Box from '@mui/material/Box'
import Search from './Search'
import Filter from './Filter'
import DisplayColumns from './DisplayColumns'
import Pagination from './Pagination'
import ShowMoreMenu from './ShowMoreMenu'

function TableNav() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Search />
        <Box sx={{ display: 'flex' }}>
          <Filter />
          <DisplayColumns />
          <Pagination />
          <ShowMoreMenu />
        </Box>
      </Box>
    </>
  )
}

export default TableNav
