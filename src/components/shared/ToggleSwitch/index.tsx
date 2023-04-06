import React, { ReactElement } from 'react'
import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { PRIMARY_GREY } from '../../../constants/color'

// interface ToggleProps extends SwitchProps {}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    width: '16px',
    height: '16px',
    color: `${PRIMARY_GREY}`,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#2F80ED',
      left: 4,
      '&.Mui-disabled': {
        color: '#2F80ED',
        '& + .MuiSwitch-track': {
          background:
            ' linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #2F80ED;',
        },
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), #2F80ED;',
      },
    },
    '&.Mui-disabled': {
      color: '#BFBFBF',
      opacity: 0.5,
      '& + .MuiSwitch-track': {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #E6E6E6;',
        opacity: 1,
      },
    },
    '& + .MuiSwitch-track': {
      opacity: 1,
      background: '#E6E6E6',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none !important',
    width: 16,
    height: 16,
    borderRadius: '50%',
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
}))

const ToggleSwitch: React.FC<SwitchProps> = ({ defaultChecked = true, onChange, disabled }): ReactElement => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <AntSwitch
        defaultChecked={defaultChecked}
        // inputProps={{ 'aria-label': 'ant design' }}
        onChange={onChange}
        disabled={disabled}
      />
    </Stack>
  )
}

export default ToggleSwitch
