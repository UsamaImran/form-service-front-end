import React, { Fragment } from 'react'
import styles from './errors.module.scss'

const InfiniteLoop = (): React.ReactElement => {
  return (
    <Fragment>
      <p className={`${styles['error-title']}`}>
        Please{' '}
        <a href="#" className={styles['error-link']}>
          Contact{' '}
        </a>
        Support
      </p>
    </Fragment>
  )
}

export default InfiniteLoop
