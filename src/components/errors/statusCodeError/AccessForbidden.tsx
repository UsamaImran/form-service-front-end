import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const AccessForbidden = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={styles['error-title']}>You may want to:</p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>
        <a href="#" className={styles['error-link']}>
          Contact
        </a>{' '}
        your site owner to request permissions
      </p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>
        Go back to the{' '}
        <a href="#" className={styles['error-link']}>
          homepage
        </a>
      </p>
    </Fragment>
  )
}

export default AccessForbidden
