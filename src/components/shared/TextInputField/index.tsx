import React, { ReactElement } from 'react'
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField'
import styles from './TextInputField.module.scss'
import { makeStyles } from '@mui/styles'
import { PRIMARY_BLACK, PRIMARY_GREY, RED, TERTIARY_GREY } from '../../../constants/color'

interface TextFieldProps extends OutlinedTextFieldProps {
  labelText?: string
  labelIcon?: JSX.Element
  containerClassName?: string
  required?: boolean
  infoIcon?: boolean
}

const useStyles = makeStyles({
  inpuField: {
    '& input': {
      padding: '12px 8px',
      fontSize: '14px',
      lineHeight: '16px',
      fontFamily: 'Open sans',
      color: PRIMARY_BLACK,
    },
    '& input::placeholder': {
      color: PRIMARY_GREY,
      fontFamily: 'Open sans',
      fontSize: '14px',
    },
    '& input.Mui-disabled': {
      backgroundColor: TERTIARY_GREY,
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: `${RED} !important`,
      margin: '2px 0 0',
      fontFamily: 'Open sans',
      lineHeight: '16px',
    },
  },
})

const TextInputField: React.FC<TextFieldProps> = ({
  labelText = '',
  containerClassName = '',
  required,
  infoIcon,
  ...props
}): ReactElement => {
  const classes = useStyles()
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <label className={labelText.length ? styles.label : ''}>
        {labelText}
        {required ? <span className={styles.required}>*</span> : ''}
        {infoIcon ? <img src="/images/info.svg" className={styles.infoIcon} /> : ''}
      </label>
      <TextField {...props} className={classes.inpuField} required={required} />
    </div>
  )
}
TextInputField.defaultProps = {
  variant: 'outlined',
}
export default TextInputField
