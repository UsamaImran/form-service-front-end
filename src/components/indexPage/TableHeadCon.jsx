import TableCell from '@mui/material/TableCell'
import { data } from './indexPageData'

function TableHeadCon() {
  return (
    <>
      {data.columns.map((column) => (
        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
          {column.label}
        </TableCell>
      ))}
    </>
  )
}

export default TableHeadCon
