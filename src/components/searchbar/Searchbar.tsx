import React, { ReactElement } from 'react'
import Styles from './Searchbar.module.scss'

interface ISearchBar extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: Array<string | number>
  showOptions?: boolean
  searchBarClassName?: string
}

const SearchBar: React.FC<ISearchBar> = ({
  value = '',
  options = [],
  onChange,
  onKeyDown,
  searchBarClassName,
  showOptions = true,
  placeholder = 'Search here....',
}): ReactElement => {
  return (
    <div className={Styles.searchBar}>
      <input
        className={`${Styles.input} ${searchBarClassName}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {showOptions && (
        <select disabled={!options.length ? true : false} className={Styles.select}>
          <option>Selected option</option>
        </select>
      )}
    </div>
  )
}
export default SearchBar
