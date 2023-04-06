import React, { ReactElement } from 'react'
import { Typography as TypographyMui, TypographyProps } from '@mui/material'

const Typography: React.FC<TypographyProps> = ({ children, ...props }): ReactElement => {
  return <TypographyMui {...props}>{children}</TypographyMui>
}

export default Typography
