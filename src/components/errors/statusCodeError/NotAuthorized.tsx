import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const NotAuthorized = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={styles['error-title']}>
        Please try to{' '}
        <a href="#" className={styles['error-link']}>
          login
        </a>
      </p>
    </Fragment>
  )
}

export default NotAuthorized
