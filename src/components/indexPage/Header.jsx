import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '../shared/Button'

function Header({ title, btnIcon, btnText }) {
  return (
    <>
      <Box sx={{ display: 'flex', my: 2 }}>
        <Typography align="left" variant="h4" component="span" sx={{ flexGrow: 1 }}>
          {title}s Index
        </Typography>
        <Button variant="contained" startIcon={btnIcon}>
          {btnText}
        </Button>
      </Box>
    </>
  )
}

export default Header
