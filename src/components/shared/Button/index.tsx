import React, { ReactElement } from 'react'
import { Button as ButtonMui, ButtonProps } from '@mui/material'
import styles from './Button.module.scss'
import { makeStyles } from '@mui/styles'
import { PRIMARY_BUTTON, PRIMARY_BUTTON_HOVER, PRIMARY_GREY, TERTIARY_GREY, WHITE } from '../../../constants/color'

const useStyles = makeStyles({
  buttonWrapper: {
    '& .MuiButton-containedPrimary': {
      backgroundColor: PRIMARY_BUTTON,
      '&:hover': {
        backgroundColor: PRIMARY_BUTTON_HOVER,
      },
    },
    '& .MuiButton-outlinedPrimary': {
      '&:hover': {
        backgroundColor: PRIMARY_BUTTON_HOVER,
        color: WHITE,
      },
    },
    '& .MuiButton-textPrimary': {
      color: PRIMARY_BUTTON,
      '&:hover': {
        color: PRIMARY_BUTTON_HOVER,
        backgroundColor: 'transparent !important',
      },
    },
    '& .MuiButton-containedPrimary.Mui-disabled': {
      backgroundColor: TERTIARY_GREY,
      color: PRIMARY_GREY,
    },
    '& .MuiButton-outlinedPrimary.Mui-disabled': {
      borderColor: PRIMARY_GREY,
      color: PRIMARY_GREY,
    },
    '& .MuiButton-textPrimary.Mui-disabled': {
      color: PRIMARY_GREY,
    },
    '& .MuiSvgIcon-root': {
      height: '16px',
      width: '16px',
    },
  },
})

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.buttonWrapper}>
      <ButtonMui className={`${className} ${styles.defaultButton}`} {...rest}>
        {children}
      </ButtonMui>
    </div>
  )
}

Button.defaultProps = {
  color: 'primary',
}

export default Button
