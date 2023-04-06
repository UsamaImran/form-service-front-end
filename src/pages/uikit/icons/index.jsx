import { Tooltip, Box, Typography, IconButton } from '@mui/material'
import { obj } from 'styles/icons'
import Icon from './Icon'

const style = {
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gap: 1,
  gridTemplateRows: 'auto',
  gridTemplateAreas: `"h i i i i i i i "`,
}

function IconsIndex() {
  const handleClick = (icon) => {
    let str = `import { ${icon} } from 'styles/icons'`
    navigator.clipboard.writeText(str)
  }
  return (
    <>
      {obj.icons.map((arr, i) => (
        <Box sx={style} key={`${arr}-${i}`}>
          <Box sx={{ gridArea: 'h' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: 14, p: 2 }}>{obj.groups[i]}</Typography>
          </Box>
          <Box item sx={{ gridArea: 'i' }}>
            {arr.map((name, p) => (
              <Tooltip title={obj.names[i][p]} key={`${name}-${p}`}>
                <IconButton
                  onClick={() => {
                    handleClick(obj.names[i][p])
                  }}
                >
                  <Icon iconName={name} />
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      ))}
    </>
  )
}

export default IconsIndex
