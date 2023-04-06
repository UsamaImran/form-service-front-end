import React, { ReactElement } from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import DropdownStyles from './Dropdown.module.scss'

interface IDropdownPropType extends SelectProps {
  labelText?: string
  options: Array<string>
  placeholder?: string
  errorMessage?: string
  error?: boolean
  containerClassName?: string
  height?: string
  width?: string
}

const Dropdown = ({
  labelText,
  value = '',
  options = [],
  placeholder,
  error,
  errorMessage,
  containerClassName = '',
  height = 'auto',
  width = 'auto',
  ...props
}: IDropdownPropType): ReactElement => {
  return (
    <div className={[containerClassName, DropdownStyles['container']].join(' ')}>
      <label className={DropdownStyles['container__label']}>{labelText}</label>
      <Select
        className={DropdownStyles.select}
        style={{ height: height, width: width }}
        error={error}
        value={value}
        renderValue={() => {
          if (value === '' && placeholder) {
            return <>{placeholder}</>
          } else {
            return <>{value}</>
          }
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        {...props}
      >
        <MenuItem disabled value="">
          <>{placeholder && placeholder}</>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error ? <label className={DropdownStyles['container__error']}>{errorMessage}</label> : null}
    </div>
  )
}

Dropdown.defaultProps = {
  displayEmpty: true,
}
export default Dropdown
