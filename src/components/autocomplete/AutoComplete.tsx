import React from 'react'
import { Autocomplete, AutocompleteProps } from '@mui/material'
import TextInputField from '../shared/TextInputField'
import { InputAdornment } from '@mui/material'
import styles from './Autocomplete.module.scss'
import { IAutocompleteOption } from '../../layouts/lookup/relationships/RelationshipMappingModal'

export interface IAutocomplete {
  leftIcon?: JSX.Element
  options: any[]
  labelText?: string
  width?: string
  disable?: boolean
  placeholder?: string
  optionsKey?: string
  defaultOption?: IAutocompleteOption
  handleSelectedOption?: (option: any) => void
  clearInput?: boolean
  value?: string
}

const AutoComplete: React.FC<IAutocomplete> = ({
  leftIcon,
  labelText = '',
  options,
  width = '300px',
  disable = false,
  placeholder = '',
  handleSelectedOption = (val = '') => {},
  clearInput = false,
  value = '',
}) => {
  const [resetAutoComplete, setResetAutoComplete] = React.useState(1)
  const backgroundColor = disable ? '#f2f2f2' : 'transparent'
  React.useEffect(() => {
    if (clearInput) setResetAutoComplete((prevState) => prevState + 1)
  }, [clearInput])

  return (
    <div>
      <label className={labelText.length ? styles.label : ''}>{labelText}</label>
      <Autocomplete
        disabled={disable}
        clearOnBlur
        key={resetAutoComplete}
        disablePortal
        id="combo-box-demo"
        value={value}
        options={options}
        sx={{ width: width, backgroundColor: backgroundColor }}
        onChange={(e, value) => {
          console.log(value, '_________')
          handleSelectedOption(value)
        }}
        getOptionLabel={(option) => option.name || ''}
        renderInput={(params) => {
          if (leftIcon) {
            params.InputProps.startAdornment = (
              <>
                <InputAdornment position="start">{leftIcon}</InputAdornment>
                {params.InputProps.startAdornment}
              </>
            )
          }
          return <TextInputField {...params} variant="outlined" placeholder={placeholder} />
        }}
      />
    </div>
  )
}

export default AutoComplete
