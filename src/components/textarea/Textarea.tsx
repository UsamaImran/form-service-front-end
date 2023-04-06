import React, { ReactElement } from 'react'
import TextareaAutosize, { TextareaAutosizeProps } from '@mui/material/TextareaAutosize'
import Styles from './Textarea.module.scss'
interface TextAreaTypes extends TextareaAutosizeProps {
  labelText?: string | JSX.Element
  error?: boolean
  helperText?: string
}

const Textarea: React.FC<TextAreaTypes> = ({ labelText, error, helperText, ...props }): ReactElement => {
  return (
    <div className={Styles.container}>
      <label className={`${Styles.label}`}>{labelText}</label>
      <TextareaAutosize
        style={{ border: error ? '1px solid red' : '' }}
        className={Styles.textArea}
        {...props}
        aria-label="minimum height"
        minRows={6}
        placeholder={props.placeholder}
      />
      <span className={Styles['errorMsg']}> {helperText} </span>
    </div>
  )
}

export default Textarea
