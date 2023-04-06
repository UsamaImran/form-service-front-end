import React from 'react'
import { Divider } from '@mui/material'
import styles from './Pagination.module.scss'
import { useGridApiContext, useGridState } from '@mui/x-data-grid'

interface IPagination {
  className: string
  options: number[]
}
const CustomPagination: React.FC<IPagination> = ({ className, options }) => {
  const apiRef = useGridApiContext()
  const [state] = useGridState(apiRef)

  const { rowCount, page, pageSize, pageCount } = state.pagination

  const handlePageStart = () => {
    apiRef?.current.setPage(0)
  }

  const handlePageEnd = () => {
    const endPage = Math.floor((rowCount - 1) / pageSize)
    apiRef?.current.setPage(endPage)
  }

  const handlePageChange = (page: number) => {
    if (page > -1 && page < rowCount) {
      apiRef?.current.setPage(page)
    }
  }

  const getLabel = () => {
    let start = page * pageSize + 1
    let end = start + (pageSize - 1)
    if (end > rowCount) end = rowCount

    if (rowCount === 0) {
      start = 0
      end = 0
    }

    return `Showing ${start} - ${end} of ${rowCount}`
  }

  const pageSizeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    apiRef?.current.setPageSize(parseInt(e.target.value))
  }

  const getPaginationBody = () => {
    const isFirstPage = page === 0 || rowCount === 0
    const isLastPage = page === pageCount - 1 || rowCount === 0

    const rotateFirst = isFirstPage ? 'rotate(0deg)' : 'rotate(180deg)'
    const rotateLast = isLastPage ? 'rotate(180deg)' : 'rotate(0deg)'

    const cursorFirst = isFirstPage ? 'default' : 'pointer'
    const cursorLast = isLastPage ? 'default' : 'pointer'

    return (
      <div className={`${styles['pagination--slot']} ${className}`}>
        <img
          src={isFirstPage ? '/images/pageEndInActive.svg' : '/images/pageEndActive.svg'}
          className={styles['img']}
          onClick={() => handlePageStart()}
          title="go to first page"
          style={{ cursor: cursorFirst, transform: rotateFirst }}
        />
        <img
          src={isFirstPage ? '/images/prevPageInActive.svg' : '/images/nextPageActive.svg'}
          className={styles['img']}
          onClick={() => handlePageChange(page - 1)}
          style={{ cursor: cursorFirst, transform: rotateFirst }}
          title="go to previous page"
        />
        &nbsp;
        <label> {getLabel()}</label>
        &nbsp;
        <img
          src={!isLastPage ? '/images/nextPageActive.svg' : '/images/prevPageInActive.svg'}
          className={styles['img']}
          onClick={() => handlePageChange(page + 1)}
          style={{ cursor: cursorLast, transform: rotateLast }}
          title="go to next page"
        />
        <img
          src={!isLastPage ? '/images/pageEndActive.svg' : '/images/pageEndInActive.svg'}
          className={styles['img']}
          onClick={() => handlePageEnd()}
          title="go to last page"
          style={{ cursor: cursorLast, transform: rotateLast }}
        />
      </div>
    )
  }

  return (
    <div className={styles['container']}>
      <div className={styles['page-size']}>
        <div className={styles['container__QuickSearchtoolbar--images']}>
          <label className={styles['label']}>Show:</label>
          <select className={styles['select']} onChange={(e) => pageSizeHandler(e)}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Divider orientation="vertical" color="#bfbfbf" style={{ height: 27 }} />
          {getPaginationBody()}
        </div>
      </div>
      <div className={styles['pages']}></div>
    </div>
  )
}

export default CustomPagination
