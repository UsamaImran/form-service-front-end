import { MenuItem, Select, SelectProps } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

interface IOption {
  key: string
  value: string
}
interface IDropdownPopover extends SelectProps {
  options: IOption[]
  disableOptions?: string[]
}
const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0,
    },
  },
})

const DropdownPopover: React.FC<IDropdownPopover> = ({ options, disableOptions, ...rest }) => {
  const classes = useStyles()
  const isDisable = (value: string) => {
    return disableOptions?.includes(value)
  }
  return (
    <Select
      displayEmpty
      className={classes.root}
      inputProps={{ 'aria-label': 'Without label' }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
        },
      }}
      {...rest}
    >
      {options.map((option, index) => {
        return (
          <MenuItem key={index} value={option.key} disabled={isDisable(option.key)}>
            {option.value}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default DropdownPopover
