import React from 'react'
import Checkbox from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { ILookupValue } from '../../context/lookupContext/LookupInterface'

export interface IAutocompleteSwitch {
  options: ILookupValue[] | []
  onOptionSelect: (values: ILookupValue[], id: string) => void
  parentId: string
}
const AutocompleteSwitch: React.FC<IAutocompleteSwitch> = ({ options, onOptionSelect, parentId }) => {
  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        onChange={(e, value) => onOptionSelect(value, parentId)}
        getOptionLabel={(option) => option.valueName}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.valueName}
          </li>
        )}
        style={{ width: '100%', height: '60px', minHeight: '60px', overflowY: 'auto' }}
        renderInput={(params) => <TextField {...params} placeholder="Add values..." />}
      />
    </div>
  )
}

export default AutocompleteSwitch

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
]
