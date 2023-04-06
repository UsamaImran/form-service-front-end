import React, { Fragment } from 'react'
import styles from './errors.module.scss'
import SearchBar from '../../searchbar/Searchbar'

const NotFound = (): React.ReactElement => {
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
        Update your favorites or bookmarks in case they contain broken links
      </p>
      <p className={`${styles['error-title']} ${styles['error-list-item']}`}>Try searching:</p>
      <SearchBar showOptions={false} searchBarClassName={styles['search-bar']} placeholder={'Search...'} />
    </Fragment>
  )
}

export default NotFound
