import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableNav from './tableNav/TableNav'
import TableHeadCon from './TableHeadCon'
import TableBodyCon from './TableBodyCon'

function TableIndex() {
  return (
    <>
      <TableNav />
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableHeadCon />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableBodyCon />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableIndex
