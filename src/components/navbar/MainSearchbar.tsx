import { Autocomplete, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { SidebarList } from '../../constants/constants'
import TextInputField from '../shared/TextInputField'
import styles from './Navbar.module.scss'

const useStyles = makeStyles(() => ({
  searchAutoComplete: {
    width: '0 !important',
    '& .MuiInputBase-root': {
      minWidth: '594px',
      padding: '0 40px 0 0 !important',
      borderRadius: '25px',
      backgroundColor: '#fff',
      '& input': {
        paddingLeft: '40px !important',
        backgroundImage: 'url(../images/searchImg.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '11px',
        backgroundPositionX: '11.51px',
        backgroundSize: '17.5px 17.5px',
        height: '25px',
        '&::placeholder': {
          lineHeight: '1.5em',
          fontSize: '16px',
        },
      },
      // '& .MuiAutocomplete-endAdornment': {
      //   height: '100%',
      //   width: '120px',
      //   top: 0,
      //   display: ' flex',
      //   alignItems: 'center',
      //   justifyContent: 'flex-end',
      //   borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
      // },
    },
  },
}))

const MainSearchbar = () => {
  const classes = useStyles()
  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={SidebarList}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.label}
          </Box>
        )}
        className={`${classes.searchAutoComplete} ${styles.searchAutoComplete}`}
        renderInput={(params) => (
          <TextInputField
            variant={'outlined'}
            {...params}
            placeholder="Search here..."
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </>
  )
}
export default MainSearchbar
