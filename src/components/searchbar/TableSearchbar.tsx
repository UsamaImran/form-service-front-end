import React, { ReactElement } from 'react'
import TextField, { OutlinedTextFieldProps as TextFieldType } from '@mui/material/TextField'

const TableSearchbar: React.FC<TextFieldType> = (props): ReactElement => {
  return <TextField {...props} margin="none" />
}

TableSearchbar.defaultProps = {
  variant: 'outlined',
}
export default TableSearchbar
