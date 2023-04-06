import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const InternalServerError = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={styles['error-title']}>You may want to:</p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>Try again later</p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>
        <a href="#" className={styles['error-link']}>
          Contact{' '}
        </a>
        support{' '}
      </p>
      <img src="/images/error.svg" className={styles['error-image']} />
    </Fragment>
  )
}

export default InternalServerError
