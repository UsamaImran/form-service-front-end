import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { data, rows } from './indexPageData'
import AvatarAcronyms from './AvatarAc'

function TableBodyCon() {
  return (
    <>
      {rows
        // .slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {data.columns.map((column) => {
                const value = row[column.id]
                if (typeof value === 'object') {
                  value = value.toString()
                }
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.type === 'avatar' ? <AvatarAcronyms name={row.name} /> : ''}
                    {column.formay && typeof value === 'number' ? column.format(value) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
    </>
  )
}

export default TableBodyCon
