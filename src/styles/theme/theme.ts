import { createTheme } from '@mui/material'
import { PRIMARY_BUTTON, PRIMARY_BUTTON_HOVER, RED } from '../../constants/color'

const fontFamily = 'Open sans'

export const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: PRIMARY_BUTTON_HOVER,
              color: 'white',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            '&:hover': {
              backgroundColor: RED,
              color: 'white',
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '1px !important',
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {},
        },
      },
    },
  },
  palette: {
    primary: {
      light: PRIMARY_BUTTON,
      main: PRIMARY_BUTTON,
      dark: PRIMARY_BUTTON_HOVER,
      contrastText: '#fff',
    },
  },
  typography: {
    allVariants: {
      fontFamily,
      fontWeight: 500,
    },
  },
})
