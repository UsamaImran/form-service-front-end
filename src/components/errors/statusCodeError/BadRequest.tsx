import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const BadRequest = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={styles['error-title']}>You may want to:</p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>
        Go back to the{' '}
        <a href="#" className={styles['error-link']}>
          homepage
        </a>
      </p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>
        <a href="#" className={styles['error-link']}>
          Contact
        </a>{' '}
        the site owner
      </p>
    </Fragment>
  )
}

export default BadRequest
