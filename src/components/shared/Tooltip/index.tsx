import React, { ReactElement } from 'react'
import { Tooltip as TooltipMui } from '@mui/material'

import { styled } from '@mui/material/styles'
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <TooltipMui {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#333333',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#333333',
    padding: '8px',
    fontFamily: 'Open Sans !important',
    fontSize: '12px !important',
    lineHeight: '16px',
    color: '#fff',
  },
}))
const Tooltip: React.FC<TooltipProps> = ({ children, placement, title, ...rest }): ReactElement => {
  return (
    <div>
      <BootstrapTooltip title={title} {...rest} placement={placement}>
        {children}
      </BootstrapTooltip>
    </div>
  )
}
export default Tooltip
