import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import stringAvatar from './stringAvatar'

function AvatarAcronyms(name) {
  let eName = name.name
  return (
    <>
      <Tooltip title={eName}>
        <Avatar component={'span'} {...stringAvatar(eName)} />
      </Tooltip>
    </>
  )
}

export default AvatarAcronyms
