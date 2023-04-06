import React, { ReactElement } from 'react'
import { Accordion as AccordionMui } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IAccordionProps {
  label: string
  disabled?: boolean
}

const Accordion: React.FC<IAccordionProps> = ({ label, children, disabled }): ReactElement => {
  return (
    <AccordionMui disabled={disabled}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{children}</Typography>
      </AccordionDetails>
    </AccordionMui>
  )
}

export default Accordion
