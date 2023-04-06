import React from 'react'
import Classes from './Logo.module.scss'
export interface ILogo {
  text?: string
}
const Logo: React.FC<ILogo> = ({ text }) => {
  return (
    <div className={Classes['container']}>
      <div className={Classes['logo-container']}>
        <img src="/images/NGN42.svg" />
      </div>
      <label className={Classes['text']}>{text && text}</label>
    </div>
  )
}

export default Logo
