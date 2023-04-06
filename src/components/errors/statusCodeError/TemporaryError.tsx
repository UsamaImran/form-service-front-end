import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const TemporaryError = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={`${styles['error-title']}`}>Please try again later</p>
    </Fragment>
  )
}

export default TemporaryError
